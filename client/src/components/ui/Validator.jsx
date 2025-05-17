export default function Validator({ message, variant = "error", className = "" }) {
  return <div className={`validator validator-${variant} ${className}`}>{message}</div>;
}
