import styled from "styled-components";

const Copyright = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  text-align: center;
  color: var(--btn-primary-text);
  padding: 10px 0;
  font-size: small;
`;

const StyledLink = styled.a`
  color: var(--btn-primary-text);
`;

const Footer: React.FC = () => {
  return (
    <Copyright>
      © 2026 codedonkey.uk. All rights reserved.
      {" "}|{" "}
      <StyledLink href="https://codedonkey.uk/privacy-notice">Privacy Notice</StyledLink>
    </Copyright>
  );
};

export default Footer;
