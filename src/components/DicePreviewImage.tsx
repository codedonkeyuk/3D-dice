import styled from "styled-components";
import { useDiceEngine } from "../context/DiceContextProvider";
import DiceSideThumbnail from "./DiceSideThumbnail";

interface DicePreviewImageArgs {
  backgroundColor: string;
  foregroundColor: string;
}

const PreviewContainer = styled.figure`
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
  margin: 16px 0;
`;

const Caption = styled.figcaption`
  color: white;
  font-size: 14px;
  margin-top: 20px;
  text-align: center;
  font-family: sans-serif;
`;

const DicePreviewImage: React.FC<DicePreviewImageArgs> = ({
  backgroundColor,
  foregroundColor,
}) => {
  const { model } = useDiceEngine();

  if (!model || !model.form.sides || model.form.sides.length === 0) {
    return null;
  }

  const lastSide = model.form.sides[model.form.sides.length - 1];

  return (
    <PreviewContainer>
      <DiceSideThumbnail
        side={lastSide}
        alt={"An example image of a rendered side"}
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}
        width={225}
        height={225}
      />
      <Caption>
        Preview of Side {model.form.sides.length}, this is not a representation
        of the fully rendered dice.
      </Caption>
    </PreviewContainer>
  );
};

export default DicePreviewImage;
