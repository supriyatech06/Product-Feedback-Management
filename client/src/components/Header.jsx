export const Header = () => {
  return (
    <header className="hero">
      <div className="hero__copy">
        <span className="eyebrow">Resume project</span>
        <h1>PulseBoard</h1>
        <p>
          Capture product feedback, prioritize what matters, and give stakeholders a clear
          delivery signal.
        </p>
      </div>
      <div className="hero__panel">
        <p className="hero__panel-label">Suggested stack</p>
        <ul>
          <li>React + Vite frontend</li>
          <li>Node.js + Express APIs</li>
          <li>MongoDB + Mongoose models</li>
        </ul>
      </div>
    </header>
  );
};

