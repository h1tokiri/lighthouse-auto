export default function Stat({ title, value, className = "" }) {
  return (
    <div className={`stat ${className}`}>
      {title && <div className="stat-title">{title}</div>}
      {value && <div className="stat-value">{value}</div>}
    </div>
  );
}
