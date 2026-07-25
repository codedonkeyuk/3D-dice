const warning = (warningHeader: string, warningMessage: string) => (
  <div className="warning">
    <div className="warning-card">
      <h1>{warningHeader}</h1>
      <p>{warningMessage}</p>
      <a className="warning-link" href="/index.html">
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
