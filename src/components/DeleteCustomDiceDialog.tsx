import { useRef } from "react";
import { ButtonBarDiv, PrimaryButton, SecondaryButton } from "./common/Buttons";
import { DialogElement } from "./common/Dialog";
import { deleteDice as storeDiceDelete } from "../storage/customDiceStore";
import { useDiceDB } from "../context/CustomDiceDbProvider";
import Loading from "./Loading";
import { useNavigate } from "react-router";

interface DialogProps {
  diceId: string | undefined;
}

const DeleteCustomDiceDialog: React.FC<DialogProps> = ({ diceId }) => {
  const navigate = useNavigate();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const { db, isLoading, error } = useDiceDB();

  if (isLoading) {
    return <Loading />;
  }

  if (error || !db) {
    throw new Error(error as string);
  }

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

  const deleteDice = (_event: React.MouseEvent<HTMLButtonElement>) => {
    if (diceId) {
      (async () => {
        await storeDiceDelete(db, diceId);
        navigate(`/poker-dice-d6/settings`, { replace: true });
        if (dialogRef.current) {
          dialogRef.current.close();
        }
      })();
    }
  };

  return (
    <>
      <SecondaryButton onClick={openDialog}>
        Delete this Custom Dice
      </SecondaryButton>
      <DialogElement ref={dialogRef} aria-labelledby="modal-title">
        <h1 id="modal-title">Delete Dice</h1>
        <p>Are you sure you want to delete this dice</p>
        <ButtonBarDiv>
          <SecondaryButton data-command="close" onClick={(e) => closeDialog(e)}>
            Cancel
          </SecondaryButton>
          <PrimaryButton data-command="create" onClick={(e) => deleteDice(e)}>
            Delete Dice
          </PrimaryButton>
        </ButtonBarDiv>
      </DialogElement>
    </>
  );
};

export default DeleteCustomDiceDialog;
