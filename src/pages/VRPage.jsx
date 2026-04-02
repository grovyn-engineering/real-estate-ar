import { useParams, Navigate } from "react-router-dom";
import VRViewer from "@/components/vr/VRViewer";
import { getProperty } from "@/lib/properties";

export default function VRPage() {
  const { id } = useParams();
  const property = getProperty(id);

  if (!property) return <Navigate to="/" replace />;

  return <VRViewer property={property} />;
}
