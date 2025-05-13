export default function Card({ children, className = "", ...props }) {
  return (
    <div className={`card bg-base-100 shadow-lg ${className}`} {...props}>
      {children}
    </div>
  );
}
