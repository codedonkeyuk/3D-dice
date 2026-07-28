import { useSearchParams, useParams, useNavigate } from "react-router";
import styled from "styled-components";
import {
  ButtonBarDiv,
  PrimaryButton,
  SecondaryButton,
} from "../common/Buttons";
import {
  useRef,
  useState,
  type TouchEvent,
  type MouseEvent,
  useEffect,
} from "react";
import generateDrawGraphics from "./draw";
import type { GraphicElement } from "../../types";
import useRenderGraphics from "./useRenderGraphics";
import { useDiceDB } from "../../context/CustomDiceDbProvider";
import { getCustomDice, saveCustomDice } from "../../storage/customDiceStore";
import { useDiceEngine } from "../../context/DiceContextProvider";

export type XyType = { x: number; y: number };

type DragXyType = {
  cntrl: boolean;
  touchOne: XyType;
  touchTwo: XyType | undefined;
};

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const EditorButtonBarDiv = styled(ButtonBarDiv)`
  position: fixed;
  right: 0px;
  margin: 15px;
  @media (max-width: 600px) {
    flex-direction: row;
  }
`;

const DrawCanvas = styled.canvas<{ $bgColor: string }>`
  background-color: ${(props) => props.$bgColor};
  margin: auto;
  display: block;
`;

export default function SideEditor() {
  const [graphics, setGraphics] = useState<GraphicElement[]>([]);
  const scaledPenWidth = 5;
  const [searchParams] = useSearchParams();
  const { db } = useDiceDB();
  const renderGraphics = useRenderGraphics();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [dragXy, setDragXy] = useState<DragXyType[]>([]);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const nextParams = new URLSearchParams(searchParams);
  const navigate = useNavigate();
  const { refresh } = useDiceEngine();

  const { diceId, sideId } = useParams<{ diceId: string; sideId: string }>();
  const foregroundColor: string =
    searchParams.get("foreground-color") || "#FFFFFF";
  const backgroundColor: string =
    searchParams.get("background-color") || "#FF0000";

  useEffect(() => {
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      if (graphics.length > 0) {
        renderGraphics(graphics, ctx);
      }

      if (mouseDown && dragXy.length > 1) {
        const liveGraphic = generateDrawGraphics(
          dragXy,
          foregroundColor,
          scaledPenWidth,
        );
        renderGraphics([liveGraphic], ctx);
      }
    }
  }, [graphics, dragXy, mouseDown, ctx, foregroundColor, renderGraphics]);

  useEffect(() => {
    async function loadInitialGraphics() {
      if (!db || !diceId || !sideId) return;
      try {
        const dice = await getCustomDice(db, diceId);

        if (dice && dice.sides) {
          const sideNum = Number.parseInt(sideId);

          if (dice && dice.sides.length > sideNum) {
            const currentSide = dice.sides[sideNum];

            if (currentSide && currentSide.elements) {
              setGraphics(currentSide.elements);
            }
          }
        }
      } catch (error) {
        console.error("Failed to load graphics from database:", error);
      }
    }

    loadInitialGraphics();
  }, [db, diceId, sideId]);

  useEffect(() => {
    if (canvasRef.current != null) {
      const aCtx: CanvasRenderingContext2D | null =
        canvasRef.current.getContext("2d");
      if (aCtx != null) {
        setCtx(aCtx);
      }
    }
  }, [canvasRef]);

  const mouseXy = (evt: MouseEvent): DragXyType => {
    evt.stopPropagation();
    if (canvasRef.current == null) throw new Error("Could not find canvas");
    const positionInfo = canvasRef.current.getBoundingClientRect();
    return {
      cntrl: evt.ctrlKey,
      touchOne: {
        x: evt.clientX - positionInfo.x,
        y: evt.clientY - positionInfo.y,
      },
      touchTwo: undefined,
    };
  };

  const touchXy = (evt: TouchEvent): DragXyType => {
    evt.stopPropagation();
    if (canvasRef.current == null) throw new Error("Could not find canvas");
    if (evt.touches.length === 0) return dragXy[dragXy.length - 1];

    const positionInfo = canvasRef.current.getBoundingClientRect();
    return {
      cntrl: evt.ctrlKey,
      touchOne: {
        x: evt.touches[0].clientX - positionInfo.x,
        y: evt.touches[0].clientY - positionInfo.y,
      },
      touchTwo:
        evt.touches.length <= 1
          ? undefined
          : {
              x: evt.touches[1].clientX - positionInfo.x,
              y: evt.touches[1].clientY - positionInfo.y,
            },
    };
  };

  const canvasDown = (coOrds: DragXyType) => {
    setMouseDown(true);
    setDragXy([coOrds]);
  };

  const canvasMove = (coOrds: DragXyType) => {
    if (!mouseDown) return;
    setDragXy((prev) => [...prev, coOrds]);
  };

  const canvasUp = (coOrds: DragXyType | null) => {
    if (!mouseDown) return;
    setMouseDown(false);

    const finalPoints = coOrds ? [...dragXy, coOrds] : dragXy;

    if (finalPoints.length > 1) {
      const finalGraphic = generateDrawGraphics(
        finalPoints,
        foregroundColor,
        scaledPenWidth,
      );

      setGraphics((prevGraphics) => [...prevGraphics, finalGraphic]);
    }

    setDragXy([]);
  };

  const saveGraphics = () => {
    if (db && diceId) {
      (async () => {
        const customDice = await getCustomDice(db, diceId);
        if (sideId) {
          const sideNum = Number.parseInt(sideId);
          if (customDice && customDice.sides.length > sideNum) {
            customDice.sides[sideNum] = {
              ...customDice.sides[sideNum],
              elements: graphics,
            };
            await saveCustomDice(db, customDice);
            setGraphics([]);
            navigate({
              pathname: `/${diceId}/settings`,
              search: `?${nextParams.toString()}`,
            });
            refresh();
          }
        }
      })();
    }
  };

  const clearGraphics = () => {
    setGraphics([]); // Clears out the elements for this single side
  };

  const cancelGraphics = () => {
    setGraphics([]);
    navigate({
      pathname: `/${diceId}/settings`,
      search: `?${nextParams.toString()}`,
    });
  };

  return (
    <ContainerDiv>
      <EditorButtonBarDiv>
        <SecondaryButton onClick={clearGraphics}>Clear</SecondaryButton>
        <SecondaryButton onClick={cancelGraphics}>Cancel</SecondaryButton>
        <PrimaryButton onClick={saveGraphics}>Save</PrimaryButton>
      </EditorButtonBarDiv>
      <DrawCanvas
        width={500}
        height={500}
        $bgColor={backgroundColor}
        ref={canvasRef}
        onMouseDown={(evt: MouseEvent) => canvasDown(mouseXy(evt))}
        onMouseMove={(evt: MouseEvent) => canvasMove(mouseXy(evt))}
        onMouseUp={(evt: MouseEvent) => canvasUp(mouseXy(evt))}
        onTouchStart={(evt: TouchEvent<HTMLCanvasElement>) =>
          canvasDown(touchXy(evt))
        }
        onTouchMove={(evt: TouchEvent<HTMLCanvasElement>) =>
          canvasMove(touchXy(evt))
        }
        onTouchEnd={(evt: TouchEvent<HTMLCanvasElement>) =>
          canvasUp(touchXy(evt))
        }
      />
    </ContainerDiv>
  );
}
