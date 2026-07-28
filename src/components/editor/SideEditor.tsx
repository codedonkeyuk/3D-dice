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
  box-sizing: border-box;
  padding: 10px;
  overflow-y: auto;
  overflow-x: auto;
`;

const CanvasWrapper = styled.div`
  max-width: 500px;
  max-height: 500px;
  aspect-ratio: 1 / 1;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DrawCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  display: block;
  touch-action: none;
`;

const EditorButtonBarDiv = styled(ButtonBarDiv)`
  position: fixed;
  right: 0px;
  margin: 15px;
  z-index: 10;
  @media (max-width: 600px) {
    flex-direction: column-reverse;
    width: 100%;
    position: relative;
    margin: 10px auto;
    right: auto;
  }
  @media (orientation: landscape) and (pointer: coarse) and (max-width: 950px) {
    margin: 10px;
    flex-direction: column-reverse;
  }
`;

const PEN_WIDTH = 20;
const BASE_VIRTUAL_SIZE = 500;

export default function SideEditor() {
  const [graphics, setGraphics] = useState<GraphicElement[]>([]);
  const scaledPenWidth = PEN_WIDTH;
  const [searchParams] = useSearchParams();
  const { db } = useDiceDB();
  const renderGraphics = useRenderGraphics();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 500,
    height: 500,
  });
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
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        setCanvasDimensions({ width, height: width });
      }
    });

    resizeObserver.observe(wrapper);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const aCtx = canvas.getContext("2d");
    if (!aCtx) return;

    const dpr = window.devicePixelRatio || 1;

    canvas.width = canvasDimensions.width * dpr;
    canvas.height = canvasDimensions.height * dpr;

    aCtx.scale(dpr, dpr);

    const currentScaleRatio = canvasDimensions.width / BASE_VIRTUAL_SIZE;
    aCtx.scale(currentScaleRatio, currentScaleRatio);

    setCtx(aCtx);
  }, [canvasDimensions]);

  useEffect(() => {
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, BASE_VIRTUAL_SIZE, BASE_VIRTUAL_SIZE);

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

  const getNormalizedXy = (clientX: number, clientY: number): XyType => {
    if (canvasRef.current == null) throw new Error("Could not find canvas");
    const positionInfo = canvasRef.current.getBoundingClientRect();

    const cssX = clientX - positionInfo.x;
    const cssY = clientY - positionInfo.y;

    const scaleFactor = BASE_VIRTUAL_SIZE / canvasDimensions.width;
    return {
      x: cssX * scaleFactor,
      y: cssY * scaleFactor,
    };
  };

  const mouseXy = (evt: MouseEvent): DragXyType => {
    evt.stopPropagation();
    return {
      cntrl: evt.ctrlKey,
      touchOne: getNormalizedXy(evt.clientX, evt.clientY),
      touchTwo: undefined,
    };
  };

  const touchXy = (evt: TouchEvent): DragXyType => {
    evt.stopPropagation();
    if (evt.touches.length === 0) return dragXy[dragXy.length - 1];

    return {
      cntrl: evt.ctrlKey,
      touchOne: getNormalizedXy(evt.touches[0].clientX, evt.touches[0].clientY),
      touchTwo:
        evt.touches.length <= 1
          ? undefined
          : getNormalizedXy(evt.touches[1].clientX, evt.touches[1].clientY),
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

  const clearGraphics = () => setGraphics([]);
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

      <CanvasWrapper ref={wrapperRef}>
        <DrawCanvas
          style={{ backgroundColor }}
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
      </CanvasWrapper>
    </ContainerDiv>
  );
}
