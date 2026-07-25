import React from "react";
import { useSearchParams, useNavigate, useParams, Link } from "react-router";

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

  const styles: { [key: string]: React.CSSProperties } = {
    pageWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      minHeight: "100vh",
      width: "100%",
      backgroundColor: "#121214",
      padding: "16px",
      boxSizing: "border-box",
    },
    containerCard: {
      width: "100%",
      maxWidth: "800px",
      backgroundColor: "#1a1a1e",
      borderRadius: "0px",
      padding: "24px",
      marginTop: "10vh",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
      border: "1px solid #2a2a30",
      boxSizing: "border-box",
    },
    title: {
      margin: "0 0 20px 0",
      color: "#ffffff",
      fontFamily: "system-ui, -apple-system, sans-serif",
      fontSize: "24px",
      fontWeight: 600,
      letterSpacing: "-0.5px",
    },
    formLayout: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    rowGroup: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "4px 0",
    },
    label: {
      color: "#a1a1aa",
      fontFamily: "system-ui, -apple-system, sans-serif",
      fontSize: "14px",
      fontWeight: 500,
    },
    colorInputWrapper: {
      width: "44px",
      height: "44px",
      borderRadius: "0px",
      overflow: "hidden",
      border: "2px solid #2a2a30",
      cursor: "pointer",
      display: "flex",
    },
    colorInput: {
      width: "150%",
      height: "150%",
      cursor: "pointer",
      border: "none",
      background: "none",
      padding: 0,
    },
    selectElement: {
      width: "100%",
      height: "44px",
      backgroundColor: "#26262b",
      color: "#ffffff",
      border: "1px solid #3f3f46",
      borderRadius: "0px",
      padding: "0 12px",
      fontSize: "15px",
      fontFamily: "system-ui, -apple-system, sans-serif",
      outline: "none",
      cursor: "pointer",
      appearance: "none",
      WebkitAppearance: "none",
      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://w3.org' viewBox='0 0 24 24' fill='none' stroke='%23a1a1aa' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 12px center",
      backgroundSize: "16px",
    },
    submitLink: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "46px",
      marginTop: "8px",
      backgroundColor: "#3b82f6",
      color: "#ffffff",
      fontFamily: "system-ui, -apple-system, sans-serif",
      fontSize: "15px",
      fontWeight: 600,
      textDecoration: "none",
      borderRadius: "0px",
      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.2)",
      transition: "background-color 0.2s ease, transform 0.1s ease",
      cursor: "pointer",
      boxSizing: "border-box",
    },
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.containerCard}>
        <h2 style={styles.title}>Settings</h2>

        <form style={styles.formLayout} onSubmit={(e) => e.preventDefault()}>
          <div style={{ ...styles.formGroup, ...styles.rowGroup }}>
            <label htmlFor="fgColorInput" style={styles.label}>
              Foreground Color
            </label>
            <div style={styles.colorInputWrapper}>
              <input
                id="fgColorInput"
                type="color"
                value={foregroundColor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateUrlParam("foreground-color", e.target.value)
                }
                style={styles.colorInput}
              />
            </div>
          </div>

          <div style={{ ...styles.formGroup, ...styles.rowGroup }}>
            <label htmlFor="bgColorInput" style={styles.label}>
              Background Color
            </label>
            <div style={styles.colorInputWrapper}>
              <input
                id="bgColorInput"
                type="color"
                value={backgroundColor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateUrlParam("background-color", e.target.value)
                }
                style={styles.colorInput}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="diceTypeSelect" style={styles.label}>
              Dice Type
            </label>
            <select
              id="diceTypeSelect"
              value={diceType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                updateUrlParam("dice-type", e.target.value)
              }
              style={styles.selectElement}
            >
              <option value="poker-dice-d6">Poker D6</option>
              <option value="number-dice-d2">Number Dice D2</option>
              <option value="number-dice-d4">Number Dice D4</option>
              <option value="number-dice-d6">Number Dice D6</option>
              <option value="number-dice-d8">Number Dice D8</option>
              <option value="number-dice-d10">Number Dice D10</option>
              <option value="number-dice-d12">Number Dice D12</option>
              <option value="number-dice-d20">Number Dice D20</option>
            </select>
          </div>

          <Link
            className="warning-link"
            style={styles.submitLink}
            to={{
              pathname: "..",
              search: `?${searchParams.toString()}`,
            }}
            relative="path"
          >
            Load Dice
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Settings;
