import { useRef } from "react";

interface SettingsDialogProps {
  children?: React.ReactNode;
  onClose: () => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  children,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (dialogRef.current) {
      dialogRef.current.close();
      onClose();
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
        <button data-command="close" onClick={(e) => closeDialog(e)}>
          Close
        </button>
      </dialog>
    </div>
  );
};

export default SettingsDialog;
