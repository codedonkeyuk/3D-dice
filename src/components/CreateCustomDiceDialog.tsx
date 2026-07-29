import { useEffect, useRef, useState } from "react";
import { ButtonBarDiv, PrimaryButton, SecondaryButton } from "./common/Buttons";
import { DialogElement } from "./common/Dialog";
import {
  DiceInput,
  DiceSelect,
  ErrorText,
  FormGroupDiv,
  SettingsFormLabel,
} from "./common/Form";
import { useDiceDB } from "../context/CustomDiceDbProvider";
import Loading from "./Loading";
import {
  saveCustomDice,
  validateId,
  type DiceData,
  type DiceTemplate,
} from "../storage/customDiceStore";
import { findDice } from "../models/find";
import { useNavigate } from "react-router";

const CreateCustomDiceDialog: React.FC = () => {
  const [diceName, setDiceName] = useState("");
  const [diceType, setDiceType] = useState("blank-dice-d6");
  const [nameValid, setNameValid] = useState(true);
  const navigate = useNavigate();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const { db, isLoading, error } = useDiceDB();

  if (isLoading) {
    return <Loading />;
  }

  if (error || !db) {
    throw new Error(error as string);
  }

  useEffect(() => {
    if (!db) return;

    let isActive = true;
    (async () => {
      const isValid = await validateId(db, diceName);
      if (isActive) {
        setNameValid(isValid);
      }
    })();

    return () => {
      isActive = false;
    };
  }, [db, diceName]);

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeDialog = (_event: React.MouseEvent<HTMLButtonElement>) => {
    setDiceName("");
    setNameValid(true);
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const createDice = (_event: React.MouseEvent<HTMLButtonElement>) => {
    (async () => {
      const dice = findDice(diceType);
      if (dice?.form.sides) {
        const newDice: DiceData = {
          name: diceName,
          diceTemplate: diceType as DiceTemplate,
          sides: dice?.form.sides,
        };
        const dbId = await saveCustomDice(db, newDice);
        setDiceName("");
        setNameValid(true);
        navigate(`/${dbId}/settings`, { replace: true });
      }

      if (dialogRef.current) {
        dialogRef.current.close();
      }
    })();
  };

  return (
    <>
      <SecondaryButton onClick={openDialog}>Create Custom Dice</SecondaryButton>
      <DialogElement ref={dialogRef} aria-labelledby="modal-title">
        <h1 id="modal-title">Create Custom Dice</h1>
        <FormGroupDiv>
          <SettingsFormLabel htmlFor="dice-type-select">Name</SettingsFormLabel>
          <DiceInput
            id="dice-type-select"
            type="text"
            className={nameValid ? "" : "error"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDiceName(e.target.value)
            }
          />
          {!nameValid && (
            <ErrorText id="dice-type-select-error" role="alert">
              The name you just entered already exists, try a different name
            </ErrorText>
          )}
        </FormGroupDiv>
        <FormGroupDiv>
          <SettingsFormLabel htmlFor="dialogDiceTypeSelect">
            Dice Template
          </SettingsFormLabel>
          <DiceSelect
            id="dialogDiceTypeSelect"
            value={diceType}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setDiceType(e.target.value)
            }
          >
            <option value="blank-dice-d2">Dice D2</option>
            <option value="blank-dice-d4">Dice D4</option>
            <option value="blank-dice-d6">Dice D6</option>
            <option value="blank-dice-d8">Dice D8</option>
            <option value="blank-dice-d10">Dice D10</option>
            <option value="blank-dice-d12">Dice D12</option>
            <option value="blank-dice-d20">Dice D20</option>
          </DiceSelect>
        </FormGroupDiv>
        <ButtonBarDiv>
          <SecondaryButton data-command="close" onClick={(e) => closeDialog(e)}>
            Cancel
          </SecondaryButton>
          <PrimaryButton
            data-command="create"
            disabled={diceName === "" || !nameValid}
            onClick={(e) => createDice(e)}
          >
            Create Dice
          </PrimaryButton>
        </ButtonBarDiv>
      </DialogElement>
    </>
  );
};

export default CreateCustomDiceDialog;
