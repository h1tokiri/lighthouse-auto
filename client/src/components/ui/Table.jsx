export default function Table({ children, className = "" }) {
  return <table className={`table ${className}`}>{children}</table>;
}
