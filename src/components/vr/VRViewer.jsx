import { useState, lazy, Suspense } from "react";
import VRTopBar from "./VRTopBar";
import VRModeBar from "./VRModeBar";

const Viewer360    = lazy(() => import("./Viewer360"));
const GLBViewer    = lazy(() => import("./GLBViewer"));
const FloorPlanViewer = lazy(() => import("./FloorPlanViewer"));

function ViewerLoader({ label }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-black text-white gap-3">
      <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-gray-300">{label}</p>
    </div>
  );
}

function EmbedTopBar({ mode, currentRoom }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-black/80 backdrop-blur z-10 flex-shrink-0">
      <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Virtual Tour</span>
      {currentRoom && mode === "360" && (
        <span className="text-white/85 text-xs font-medium px-3 py-1 bg-white/10 rounded-full">
          {currentRoom.name}
        </span>
      )}
      {mode === "3d" && (
        <span className="text-white/85 text-xs font-medium px-3 py-1 bg-white/10 rounded-full">3D Model</span>
      )}
      {mode === "floorplan" && (
        <span className="text-white/85 text-xs font-medium px-3 py-1 bg-white/10 rounded-full">Floor Plan</span>
      )}
    </div>
  );
}

export default function VRViewer({ property, embedded = false }) {
  const [mode, setMode]          = useState("360");
  const [currentRoomId, setRoom] = useState(property.vr.rooms[0]?.id ?? "");
  const currentRoom              = property.vr.rooms.find((r) => r.id === currentRoomId);

  const containerClass = embedded
    ? "relative w-full h-full flex flex-col bg-black overflow-hidden"
    : "fixed inset-0 flex flex-col bg-black";

  return (
    <div className={containerClass}>
      {embedded
        ? <EmbedTopBar mode={mode} currentRoom={currentRoom} />
        : <VRTopBar property={property} currentRoom={currentRoom} showRoom={mode === "360"} />
      }

      <div className="flex-1 relative min-h-0">
        <Suspense fallback={<ViewerLoader label="Loading 360° Tour..." />}>
          {mode === "360" && (
            <Viewer360 rooms={property.vr.rooms} currentRoomId={currentRoomId} onRoomChange={setRoom} />
          )}
        </Suspense>
        <Suspense fallback={<ViewerLoader label="Loading 3D Model..." />}>
          {mode === "3d" && (
            <GLBViewer modelPath={currentRoom?.model ?? property.vr.model} />
          )}
        </Suspense>
        <Suspense fallback={<ViewerLoader label="Loading Floor Plan..." />}>
          {mode === "floorplan" && (
            <FloorPlanViewer
              rooms={property.vr.rooms}
              onEnterRoom={(id) => { setRoom(id); setMode("360"); }}
            />
          )}
        </Suspense>
      </div>

      <VRModeBar mode={mode} has3D={!!(currentRoom?.model ?? property.vr.model)} onModeChange={setMode} />
    </div>
  );
}
