import styled from "styled-components";

export const DialogElement = styled.dialog`
  display: none;
  &[open] {
    display: flex;
    flex-direction: column;
  }
  gap: 20px;
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
    background-color: var(--dialog-backdrop-color);
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
    outline: var(--accessibility-bdr);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transform: none;
    transition:
      opacity 0.1s linear,
      display 0.1s allow-discrete;
  }
`;
