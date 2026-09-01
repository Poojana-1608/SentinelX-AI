function Badge({ text, color }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${color}`}
    >
      {text}
    </span>
  );
}

export default Badge;