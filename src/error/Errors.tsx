const warning = (warningHeader: string, warningMessage: string) => (
  <div className="warning">
    <div className="warning-card">
      <h1>{warningHeader}</h1>
      <p>{warningMessage}</p>
      <a className="warning-link" href="/">
        Return to Main Page
      </a>
    </div>
  </div>
);

export const Error404 = () =>
  warning(
    "404 - Page Not Found",
    "Sorry, the page you are looking for does not exist.",
  );

export const Error500 = () =>
  warning(
    "500 - An Internal Error Occured",
    "Try again and if it still does not work then this app is broken!",
  );

export const ErrorDiceMissing = () =>
  warning(
    "That Dice does not Exist",
    "You will need to go back and start again.",
  );
