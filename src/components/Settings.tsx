import React from "react";
import { useSearchParams, useNavigate, useParams, Link } from "react-router";
import styled from "styled-components";

type DiceConfigKey = "foreground-color" | "background-color" | "dice-type";

type DiceType =
  | "poker-dice-d6"
  | "number-dice-d2"
  | "number-dice-d4"
  | "number-dice-d6"
  | "number-dice-d8"
  | "number-dice-d10"
  | "number-dice-d12"
  | "number-dice-d20"
  | "blank-dice-d2"
  | "blank-dice-d4"
  | "blank-dice-d6"
  | "blank-dice-d8"
  | "blank-dice-d10"
  | "blank-dice-d12"
  | "blank-dice-d20";

const PageWrapperDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  width: 100%;
  background-color: #121214;
  padding: 16px;
  box-sizing: border-box;
`;

const ContainerCardDiv = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: #1a1a1e;
  border-radius: 0px;
  padding: 24px;
  margin-top: 10vh;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  border: 1px solid #2a2a30;
  box-sizing: border-box;
`;

const TitleH2 = styled.h2`
  margin: 0 0 20px 0;
  color: #ffffff;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.5px;
`;

const DiceForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DiceFormLabel = styled.label`
  color: #a1a1aa;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  font-size: 14px;
  font-weight: 500;
`;

const FormGroupDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RowGroupDiv = styled(FormGroupDiv)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
`;

const ColorInputWrapperDiv = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 0px;
  overflow: hidden;
  border: 2px solid #2a2a30;
  cursor: pointer;
  display: flex;
`;

const ColorInput = styled.input`
  width: 150%;
  height: 150%;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
`;

const DiceSelect = styled.select`
  width: 100%;
  height: 44px;
  background-color: #26262b;
  color: #ffffff;
  border: 1px solid #3f3f46;
  border-radius: 0px;
  padding: 0 12px;
  font-size: 15px;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://w3.org' viewBox='0 0 24 24' fill='none' stroke='%23a1a1aa' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
`;

const SubmitLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 46px;
  margin-top: 8px;
  background-color: #3b82f6;
  color: #ffffff;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
  cursor: pointer;
  box-sizing: border-box;
`;

const Settings: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { diceId } = useParams<{ diceId: string }>();

  const foregroundColor: string =
    searchParams.get("foreground-color") || "#FFFFFF";
  const backgroundColor: string =
    searchParams.get("background-color") || "#FF0000";
  const diceType = (diceId || "poker-dice-d6") as DiceType;

  const updateUrlParam = (key: DiceConfigKey, value: string): void => {
    const nextParams = new URLSearchParams(searchParams);
    if (key === "dice-type") {
      nextParams.delete("dice-type");
      navigate({
        pathname: `/${value}/settings`,
        search: `?${nextParams.toString()}`,
      });
    } else {
      nextParams.set(key, value);
      setSearchParams(nextParams);
    }
  };

  return (
    <PageWrapperDiv>
      <ContainerCardDiv>
        <TitleH2>Settings</TitleH2>

        <DiceForm onSubmit={(e) => e.preventDefault()}>
          <RowGroupDiv>
            <DiceFormLabel htmlFor="fgColorInput">
              Foreground Color
            </DiceFormLabel>
            <ColorInputWrapperDiv>
              <ColorInput
                id="fgColorInput"
                type="color"
                value={foregroundColor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateUrlParam("foreground-color", e.target.value)
                }
              />
            </ColorInputWrapperDiv>
          </RowGroupDiv>

          <RowGroupDiv>
            <DiceFormLabel htmlFor="bgColorInput">
              Background Color
            </DiceFormLabel>
            <ColorInputWrapperDiv>
              <ColorInput
                id="bgColorInput"
                type="color"
                value={backgroundColor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateUrlParam("background-color", e.target.value)
                }
              />
            </ColorInputWrapperDiv>
          </RowGroupDiv>

          <FormGroupDiv>
            <DiceFormLabel htmlFor="diceTypeSelect">Dice Type</DiceFormLabel>
            <DiceSelect
              id="diceTypeSelect"
              value={diceType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                updateUrlParam("dice-type", e.target.value)
              }
            >
              <option value="poker-dice-d6">Poker D6</option>
              <option value="number-dice-d2">Number Dice D2</option>
              <option value="number-dice-d4">Number Dice D4</option>
              <option value="number-dice-d6">Number Dice D6</option>
              <option value="number-dice-d8">Number Dice D8</option>
              <option value="number-dice-d10">Number Dice D10</option>
              <option value="number-dice-d12">Number Dice D12</option>
              <option value="number-dice-d20">Number Dice D20</option>
            </DiceSelect>
          </FormGroupDiv>

          <SubmitLink
            to={{
              pathname: "..",
              search: `?${searchParams.toString()}`,
            }}
            relative="path"
          >
            Load Dice
          </SubmitLink>
        </DiceForm>
      </ContainerCardDiv>
    </PageWrapperDiv>
  );
};

export default Settings;
