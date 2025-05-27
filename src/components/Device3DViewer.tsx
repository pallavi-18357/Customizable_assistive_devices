
import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, PresentationControls } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RotateCcw, ZoomIn, ZoomOut, Download } from "lucide-react";
import * as THREE from "three";

interface Device3DViewerProps {
  deviceType?: string;
  customizations?: any;
  onDownload?: () => void;
}

// Simple 3D mesh component for demonstration
const DeviceMesh = ({ deviceType = "prosthetic" }: { deviceType: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  const getGeometry = () => {
    switch (deviceType) {
      case "prosthetic":
        return <boxGeometry args={[2, 0.5, 0.3]} />;
      case "wheelchair":
        return <cylinderGeometry args={[1, 1, 0.2, 32]} />;
      case "communication":
        return <planeGeometry args={[3, 2]} />;
      default:
        return <sphereGeometry args={[1, 32, 32]} />;
    }
  };

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      {getGeometry()}
      <meshStandardMaterial
        color={hovered ? "#3B82F6" : "#8B5CF6"}
        metalness={0.5}
        roughness={0.2}
      />
    </mesh>
  );
};

export const Device3DViewer = ({ deviceType, customizations, onDownload }: Device3DViewerProps) => {
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <Card className="w-full h-[500px] relative overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          
          <PresentationControls
            enabled={true}
            global={false}
            cursor={true}
            snap={false}
            speed={1}
            zoom={1}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
          >
            <DeviceMesh deviceType={deviceType || "prosthetic"} />
          </PresentationControls>
          
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            autoRotate={autoRotate}
            autoRotateSpeed={2}
          />
        </Suspense>
      </Canvas>
      
      {/* Controls Overlay */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          size="sm"
          variant="outline"
          className="bg-white/90 backdrop-blur-sm"
          onClick={() => setAutoRotate(!autoRotate)}
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
        {onDownload && (
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={onDownload}
          >
            <Download className="w-4 h-4" />
          </Button>
        )}
      </div>
      
      {/* Info Overlay */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
        <p className="text-sm text-gray-600">
          Click and drag to rotate • Scroll to zoom
        </p>
      </div>
    </Card>
  );
};
