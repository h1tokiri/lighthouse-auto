export default function Filter({ children, className = "" }) {
  return <div className={`filter ${className}`}>{children}</div>;
}
