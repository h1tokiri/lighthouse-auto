export default function Carousel({ children, className = "", ...props }) {
  return (
    <div className={`carousel ${className}`} {...props}>
      {children}
    </div>
  );
}
