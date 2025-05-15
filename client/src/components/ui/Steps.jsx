export default function Steps({ steps = [], current = 0, className = "" }) {
  return (
    <div className={`steps ${className}`}>
      {steps.map((label, i) => (
        <div key={i} className={`step ${i <= current ? "step-primary" : ""}`}>
          {label}
        </div>
      ))}
    </div>
  );
}
