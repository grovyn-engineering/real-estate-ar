export default function VRModeBar({ mode, has3D, onModeChange }) {
  return (
    <div className="flex items-center justify-center gap-2 px-4 py-3 bg-black/70 backdrop-blur z-10">
      <ModeButton active={mode === "360"} onClick={() => onModeChange("360")} icon="🔭" label="360° Tour" />
      <ModeButton active={mode === "3d"} onClick={() => onModeChange("3d")} icon="🧊" label="3D Model" disabled={!has3D} disabledReason="No 3D model available" />
      <ModeButton active={mode === "floorplan"} onClick={() => onModeChange("floorplan")} icon="📐" label="Floor Plan" />
    </div>
  );
}

function ModeButton({ active, onClick, icon, label, disabled, disabledReason }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={disabled ? disabledReason : label}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
        active
          ? "bg-blue-600 text-white"
          : disabled
          ? "bg-white/5 text-white/30 cursor-not-allowed"
          : "bg-white/10 text-white hover:bg-white/20"
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}
