export default function Progress({ value, max = 100, className = "" }) {
  return <progress className={`progress ${className}`} value={value} max={max} />;
}
