import styled from "styled-components";
import { useDiceEngine } from "../context/DiceContextProvider";
import DiceSideThumbnail from "./DiceSideThumbnail";
import { useNavigate, useParams, useSearchParams } from "react-router";

export interface GalleryImage {
  width: number;
  height: number;
  backgroundColor: string;
  forgroundColor: string;
}

const ImageGallery: React.FC<GalleryImage> = ({
  width,
  height,
  backgroundColor,
  forgroundColor,
}) => {
  const [searchParams] = useSearchParams();
  const { model } = useDiceEngine();
  const navigate = useNavigate();
  const { diceId } = useParams<{ diceId: string }>();

  const handleImageSelect = (side: number) => {
    const nextParams = new URLSearchParams(searchParams);
    navigate({
      pathname: `/${diceId}/settings/${side}/editor`,
      search: `?${nextParams.toString()}`,
    });
  };

  if (!model || !model.form.sides) {
    return null;
  }

  return (
    <GalleryContainer aria-label="Scrollable image gallery">
      <ScrollWrapper>
        {model?.form.sides.map((side, indx) => (
          <ImageItem key={`side_${indx}`}>
            <ImageButton
              onClick={() => handleImageSelect(indx)}
              aria-label={`Select to edit dice side ${indx + 1}`}
            >
              <StyledDiceSideThumbnail
                side={side}
                alt={`2D image of dice side ${indx + 1}`}
                backgroundColor={backgroundColor}
                foregroundColor={forgroundColor}
                width={width}
                height={height}
              />
            </ImageButton>
          </ImageItem>
        ))}
      </ScrollWrapper>
    </GalleryContainer>
  );
};

export default ImageGallery;

const GalleryContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: var(--card);
  border: 1px solid var(--border);
`;

const ScrollWrapper = styled.ul`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 8px 4px;
  margin: 0;
  list-style: none;

  -webkit-overflow-scrolling: touch;
`;

const ImageItem = styled.li`
  flex: 0 0 auto;
`;

const ImageButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  display: block;
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  outline-offset: 4px;

  &:hover {
    transform: translateY(-4px);
  }

  &:focus-visible {
    outline: var(--accessibility-bdr);
  }
`;

const StyledDiceSideThumbnail = styled(DiceSideThumbnail)`
  width: 150px;
  height: 150px;
  object-fit: cover;
  display: block;
`;
