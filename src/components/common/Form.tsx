import styled from "styled-components";

export const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SettingsFormLabel = styled.label`
  color: #a1a1aa;
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
  border: 2px solid #2a2a30;
  cursor: pointer;
  display: flex;
`;

export const ColorInput = styled.input`
  width: 150%;
  height: 150%;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
`;

export const DiceSelect = styled.select`
  width: 100%;
  height: 44px;
  background-color: #26262b;
  color: #ffffff;
  border: 1px solid #3f3f46;
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
`;

export const DiceInput = styled.input`
  height: 42px;
  background-color: #26262b;
  color: #ffffff;
  border: 1px solid #3f3f46;
  border-radius: 0px;
  padding: 0 12px;
  font-size: 15px;
  outline: none;

  &.error,
  &[aria-invalid="true"] {
    border-color: #ef4444;
    /* Red arrow */
  }
`;

export const ErrorText = styled.span`
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
  font-weight: 500;
`;
