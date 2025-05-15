export default function Badge({
  children,
  variant = "primary", // matches daisyUI’s badge-primary, badge-secondary, etc.
  outlined = false, // toggles badge-outline
  className = "",
  ...props
}) {
  return (
    <span
      className={`
        badge
        badge-${variant}
        ${outlined ? "badge-outline" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
}
