const Loading = () => (
  <div
    className="loader-background"
    role="status"
    aria-live="polite"
    aria-busy="true"
  >
    <div className="loader-message">
      <div className="spinner"></div>
      <div className="loading-text">Loading Feature...</div>
    </div>
  </div>
);

export default Loading;
