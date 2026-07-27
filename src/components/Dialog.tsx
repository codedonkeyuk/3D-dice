import { useRef } from "react";
import styled from "styled-components";
import { ButtonBarDiv, SecondaryButton } from "./Buttons";

interface HtmlDialogProps {
  children?: React.ReactNode;
  buttonText: string;
}

const Dialog = styled.dialog`
  background: var(--card);
  color: var(--text-main);
  border: 1px solid var(--border);
  border-radius: var(--card-bdr-radius);
  padding: var(--card-bdr-padding);
  width: 90%;
  max-width: 480px;
  box-shadow: var(--dialog-shadow);
  opacity: 0;
  transform: scale(0.95);
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    display 0.2s allow-discrete;

  &[open] {
    opacity: 1;
    transform: scale(1);
  }

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    opacity: 0;
    transition:
      opacity 0.2s ease,
      display 0.2s allow-discrete;
  }

  &[open]::backdrop {
    opacity: 1;
  }

  & *:focus-visible {
    outline: 3px solid #3b82f6;
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transform: none;
    transition:
      opacity 0.1s linear,
      display 0.1s allow-discrete;
  }
`;

const HtmlDialog: React.FC<HtmlDialogProps> = ({ children, buttonText }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeDialog = (_event: React.MouseEvent<HTMLButtonElement>) => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <>
      <SecondaryButton onClick={openDialog}>{buttonText}</SecondaryButton>
      <Dialog ref={dialogRef}>
        {children}
        <ButtonBarDiv>
          <SecondaryButton data-command="close" onClick={(e) => closeDialog(e)}>
            Close
          </SecondaryButton>
        </ButtonBarDiv>
      </Dialog>
    </>
  );
};

export default HtmlDialog;
