import { Link } from "react-router";
import styled, { css } from "styled-components";

export const ButtonBarDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const baseButtonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-family: inherit;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;

  &:focus-visible {
    outline: var(--accessibility-bdr);
    outline-offset: 2px;
  }

  &:disabled {
    background-color: var(--btn-disabled-bg);
    color: var(--btn-disabled-color);
    border-color: var(--border);
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.6;
  }
`;

const Button = styled.button`
  ${baseButtonStyles}
`;

export const SecondaryButton = styled(Button)`
  border: 1px solid transparent;
  background-color: var(--btn-secondary-bg);
  color: var(--btn-secondary-text);
`;

export const PrimaryButton = styled(Button)`
  border: 1px solid transparent;
  background-color: var(--btn-primary-bg);
  color: var(--btn-primary-text);
`;

const AnchorButton = styled(Link)`
  ${baseButtonStyles}
`;

export const SecondaryButtonLink = styled(AnchorButton)`
  border: 1px solid transparent;
  background-color: var(--btn-secondary-bg);
  color: var(--btn-secondary-text);
`;

export const PrimaryButtonLink = styled(AnchorButton)`
  border: 1px solid transparent;
  background-color: var(--btn-primary-bg);
  color: var(--btn-primary-text);
`;
