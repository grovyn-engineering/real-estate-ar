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

export default function VRViewer({ property }) {
  const [mode, setMode]          = useState("360");
  const [currentRoomId, setRoom] = useState(property.vr.rooms[0]?.id ?? "");
  const currentRoom              = property.vr.rooms.find((r) => r.id === currentRoomId);

  return (
    <div className="fixed inset-0 flex flex-col bg-black">
      <VRTopBar property={property} currentRoom={currentRoom} showRoom={mode === "360"} />

      <div className="flex-1 relative">
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
