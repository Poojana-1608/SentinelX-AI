function Button({
  text,
  icon,
  onClick,
  className = "",
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all duration-300 shadow ${className}`}
    >
      {icon}
      {text}
    </button>
  );
}

export default Button;