export default function Avatar({ src, alt = "avatar", size = "md", ...props }) {
  const sizeClass =
    {
      sm: "w-8 h-8",
      md: "w-12 h-12",
      lg: "w-16 h-16",
    }[size] || "w-12 h-12";

  return (
    <div className="avatar" {...props}>
      <div className={sizeClass + " rounded-full"}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}
