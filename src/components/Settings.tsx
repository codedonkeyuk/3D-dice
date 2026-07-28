import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router";
import { ButtonBarDiv, PrimaryButtonLink } from "./common/Buttons";
import CreateCustomDiceDialog from "./CreateCustomDiceDialog";
import { TitleH1 } from "./common/Headers";
import {
  ColorInput,
  ColorInputWrapperDiv,
  SettingsForm,
  SettingsFormLabel,
  DiceSelect,
  FormGroupDiv,
  RowGroupDiv,
} from "./common/Form";
import { ContainerCardDiv, PageWrapperDiv } from "./common/Container";
import { useDiceDB } from "../context/CustomDiceDbProvider";
import Loading from "./Loading";
import {
  fetchDiceSelectOptions,
  type DiceSelectOption,
} from "../storage/customDiceStore";
import DeleteCustomDiceDialog from "./DeleteCustomDiceDialog";
import DiceGallery from "./DiceGallery";
import DicePreviewImage from "./DicePreviewImage";

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

const Settings: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { db, isLoading, error } = useDiceDB();
  const [customTemplates, setCustomTemplates] = useState<DiceSelectOption[]>(
    [],
  );
  const [isCustom, setIsCustom] = useState(false);
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

  useEffect(() => {
    if (customTemplates && customTemplates.length > 0 && diceId) {
      const customDice = customTemplates.find(({ id }) => diceId === id);
      setIsCustom(customDice != null);
    }
  }, [customTemplates, diceId]);

  useEffect(() => {
    if (!isLoading && !error && db) {
      (async () => {
        const options = await fetchDiceSelectOptions(db);
        setCustomTemplates(options);
      })();
    }
  }, [db, isLoading, error, diceId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <PageWrapperDiv>
      <ContainerCardDiv>
        <TitleH1>Settings</TitleH1>
        <DicePreviewImage
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
        />

        <SettingsForm onSubmit={(e) => e.preventDefault()}>
          <RowGroupDiv>
            <SettingsFormLabel htmlFor="fgColorInput">
              Foreground Color
            </SettingsFormLabel>
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
            <SettingsFormLabel htmlFor="bgColorInput">
              Background Color
            </SettingsFormLabel>
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
            <SettingsFormLabel htmlFor="diceTypeSelect">
              Dice Type
            </SettingsFormLabel>
            <DiceSelect
              id="diceTypeSelect"
              value={diceType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                updateUrlParam("dice-type", e.target.value)
              }
            >
              <optgroup key="system-dice-group" label="System Dice">
                <option value="poker-dice-d6">Poker D6</option>
                <option value="number-dice-d2">Number Dice D2</option>
                <option value="number-dice-d4">Number Dice D4</option>
                <option value="number-dice-d6">Number Dice D6</option>
                <option value="number-dice-d8">Number Dice D8</option>
                <option value="number-dice-d10">Number Dice D10</option>
                <option value="number-dice-d12">Number Dice D12</option>
                <option value="number-dice-d20">Number Dice D20</option>
              </optgroup>
              {customTemplates.length > 0 && (
                <optgroup key="custom-dice-group" label="Custom Dice">
                  {customTemplates.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </optgroup>
              )}
            </DiceSelect>
          </FormGroupDiv>
          {isCustom && (
            <FormGroupDiv>
              <SettingsFormLabel htmlFor="diceTypeSelect">
                Edit Dice
              </SettingsFormLabel>
              <DiceGallery
                width={150}
                height={150}
                backgroundColor={backgroundColor}
                forgroundColor={foregroundColor}
              />
            </FormGroupDiv>
          )}
          <ButtonBarDiv>
            {isCustom && <DeleteCustomDiceDialog diceId={diceId} />}
            <CreateCustomDiceDialog />
            <PrimaryButtonLink
              to={{
                pathname: "..",
                search: `?${searchParams.toString()}`,
              }}
              relative="path"
            >
              Load Dice
            </PrimaryButtonLink>
          </ButtonBarDiv>
        </SettingsForm>
      </ContainerCardDiv>
    </PageWrapperDiv>
  );
};

export default Settings;
