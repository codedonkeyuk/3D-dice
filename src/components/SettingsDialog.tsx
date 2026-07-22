import { useRef } from "react";

interface SettingsDialogProps {
  children?: React.ReactNode;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <div>
      <button
        className="dice-settings-button"
        onClick={openDialog}
        aria-label="Open Settings"
      >
        <span className="sr-only">Menu</span>
      </button>
      <dialog ref={dialogRef}>
        {children}
        <div className="actions">
          <button
            className="btn btn-secondary"
            data-command="close"
            onClick={(e) => closeDialog(e)}
          >
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default SettingsDialog;
