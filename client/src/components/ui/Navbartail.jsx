export default function Navbar({ children, className = "", ...props }) {
  return (
    <div className={`navbar bg-base-100 ${className}`} {...props}>
      {children}
    </div>
  );
}
