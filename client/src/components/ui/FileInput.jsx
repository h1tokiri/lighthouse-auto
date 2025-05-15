export default function FileInput({ label, className = "", ...props }) {
  return (
    <div className="form-control">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <input type="file" className={`file-input file-input-bordered ${className}`} {...props} />
    </div>
  );
}
