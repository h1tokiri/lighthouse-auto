export default function Dropdown({ children, className = "", ...props }) {
  return (
    <div className={`dropdown ${className}`} {...props}>
      {children}
    </div>
  );
}
