import styled from "styled-components";

export const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SettingsFormLabel = styled.label`
  color: var(--text-main);
  font-size: 14px;
  font-weight: 500;
`;

export const FormGroupDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const RowGroupDiv = styled(FormGroupDiv)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
`;

export const ColorInputWrapperDiv = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 0px;
  overflow: hidden;
  border: 1px solid var(--border);
  cursor: pointer;
  display: flex;
  position: relative;

  &:focus-within {
    border-color: var(--accessibility-bdr-color);
  }
`;

export const ColorInput = styled.input`
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  cursor: pointer;

  -webkit-appearance: none;
  appearance: none;

  position: absolute;
  top: -5px;
  left: -5px;
  width: calc(100% + 10px);
  height: calc(100% + 10px);

  &::-webkit-color-swatch-wrapper {
    padding: 0;
    margin: 0;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 0;
    padding: 0;
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: none;
  }

  &:focus ~ .focus-ring,
  &:focus-visible {
  }
`;

export const DiceSelect = styled.select`
  width: 100%;
  height: 44px;
  background-color: var(--card);
  color: var(--text-main);
  border: 1px solid var(--border);
  border-radius: 0px;
  padding: 0 12px;
  font-size: 15px;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:svg='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a1a1aa' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-size: 16px;
  &:focus {
    outline: var(--accessibility-bdr);
    outline-offset: 2px;
  }
`;

export const DiceInput = styled.input`
  height: 42px;
  background-color: var(--card);
  color: var(--text-main);
  border: 1px solid var(--border);
  border-radius: 0px;
  padding: 0 12px;
  font-size: 15px;
  outline: none;
  &:focus {
    outline: var(--accessibility-bdr);
    outline-offset: 2px;
  }

  &.error,
  &[aria-invalid="true"] {
    border-color: var(--btn-primary-bg);
  }
`;

export const ErrorText = styled.span`
  color: var(--btn-primary-bg);
  font-size: 12px;
  margin-top: 4px;
  font-weight: 500;
`;
