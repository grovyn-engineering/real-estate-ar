import { useNavigate } from "react-router-dom";

export default function VRTopBar({ property, currentRoom, showRoom }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between px-3 py-2 bg-black/70 backdrop-blur z-10 gap-2 min-w-0">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <button
          onClick={() => navigate(-1)}
          className="text-white/60 hover:text-white text-sm transition-colors bg-transparent border-none cursor-pointer"
        >
          ← Back
        </button>
        <div className="min-w-0">
          <p className="text-white font-semibold text-sm leading-tight truncate">
            {property.title}
          </p>
          <p className="text-gray-400 text-xs truncate">{property.location}</p>
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
