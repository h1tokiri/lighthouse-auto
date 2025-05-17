export default function Rating({ value = 0, max = 5, className = "", ...props }) {
  const stars = Array.from({ length: max }, (_, i) => (
    <input
      key={i}
      type="radio"
      name="rating"
      className="mask mask-star"
      checked={i < value}
      readOnly
    />
  ));
  return (
    <div className={`rating ${className}`} {...props}>
      {stars}
    </div>
  );
}
