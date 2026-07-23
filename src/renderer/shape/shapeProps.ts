import type { GraphicElement } from "../../types";

const applyShapeDefaults = (props: GraphicElement): GraphicElement => ({
  ...{ x: 0, y: 0 },
  ...props,
});

export default applyShapeDefaults;
