export default function Fieldset({ legend, children, className = "" }) {
  return (
    <fieldset className={`fieldset ${className}`}>
      {legend && <legend>{legend}</legend>}
      {children}
    </fieldset>
  );
}
