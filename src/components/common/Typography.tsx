import styled from "styled-components";

export const TitleH1 = styled.h1`
  margin: 0 0 20px 0;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.5px;
`;

export const Paragraph = styled.p`
  font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  line-height: 1.6;
  max-width: 65ch;
  margin-block-start: 0;
  margin-block-end: 1.25rem;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
`;
