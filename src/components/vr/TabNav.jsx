import { Link, useLocation } from "react-router-dom";

const tabs = [
  { label: "360° Photos", to: "/360-photos" },
  { label: "3D Scan",     to: "/3d-scan"    },
  { label: "Floor Plan",  to: "/floor-plan" },
];

export default function TabNav() {
  const { pathname } = useLocation();

  if (pathname.startsWith("/vr/") || pathname === "/") return null;

  return (
    <nav className="w-full border-b border-white/8 bg-[#070c18]/90 backdrop-blur sticky top-0 z-50">
      <div className="flex items-center px-2">
        <Link
          to="/"
          className="flex items-center gap-1.5 px-4 py-3.5 text-xs font-semibold text-white/40 hover:text-white/80 transition-colors shrink-0"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Listings
        </Link>
        <div className="w-px h-4 bg-white/10 mx-1" />
        {tabs.map((tab) => (
          <Link
            key={tab.to}
            to={tab.to}
            className={`px-5 py-3.5 text-xs font-semibold border-b-2 transition-colors tracking-wide ${
              pathname === tab.to
                ? "border-blue-500 text-white"
                : "border-transparent text-white/40 hover:text-white/70 hover:border-white/20"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
