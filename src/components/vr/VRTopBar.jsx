import { Link } from "react-router-dom";

export default function VRTopBar({ property, currentRoom, showRoom }) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-black/70 backdrop-blur z-10">
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="text-white/60 hover:text-white text-sm transition-colors"
        >
          ← Back
        </Link>
        <div>
          <p className="text-white font-semibold text-sm leading-tight">
            {property.title}
          </p>
          <p className="text-gray-400 text-xs">{property.location}</p>
        </div>
      </div>

      {showRoom && currentRoom && (
        <span className="text-white/80 text-sm font-medium px-3 py-1 bg-white/10 rounded-full">
          {currentRoom.name}
        </span>
      )}

      <p className="text-white font-bold text-base">{property.price}</p>
    </div>
  );
}
