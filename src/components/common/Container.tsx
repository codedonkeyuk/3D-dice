import styled from "styled-components";

export const PageWrapperDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  width: 100%;
  background-color: #121214;
  padding: 16px;
  box-sizing: border-box;
`;

export const ContainerCardDiv = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: #1a1a1e;
  border-radius: 0px;
  padding: 24px;
  border: 1px solid #2a2a30;
  box-sizing: border-box;
  @media (max-width: 600px) {
    margin-top: 0;
  }
`;
