export default function Alert({
  children,
  variant = "info",
  className = "",
  ...props
}) {
  return (
    <div className={`alert alert-${variant} ${className}`} {...props}>
      {children}
    </div>
  );
}
