import { Link } from "react-router-dom";

export default function NavTab({ to, label, isActive }) {
  return (
    <Link
      to={to}
      className={`px-5 py-3.5 text-xs font-semibold border-b-2 transition-colors tracking-wide ${
        isActive
          ? "border-blue-500 text-white"
          : "border-transparent text-white/40 hover:text-white/70 hover:border-white/20"
      }`}
    >
      {label}
    </Link>
  );
}
