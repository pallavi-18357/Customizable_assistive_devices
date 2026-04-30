import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";

interface Device3DViewerProps {
  deviceType?: string;
  deviceId?: string | number;
  customizations?: {
    gripStrength?: number;
    fingerLength?: number;
    palmSize?: number;
    color: string;
    material: string;
    seatHeight?: number;
    backrestAngle?: number;
    wheelSize?: number;
    buttonSize?: number;
    buttonSpacing?: number;
    handleLength?: number;
    handleAngle?: number;
    footLength?: number;
    footWidth?: number;
    archHeight?: number;
    heelHeight?: number;
    vibrationIntensity?: number;
    deviceSize?: number;
  };
  onDownload?: () => void;
}

const getModelPath = (deviceId?: string | number) => {
  switch (deviceId) {
    case 1:
    case "prosthetic":
      return "/models/full_left_hand_supported.stl";
    case 2:
    case "wheelchair":
      return "/models/wheelchair.stl";
    case 3:
    case "communication":
      return "/models/communication_board.stl";
    case 4:
    case "adaptive-utensil":
      return "/models/Adaptiveutensil.stl";
    case 5:
    case "vision-aid":
      return "/models/visionaid.stl";
    case 6:
    case "orthotic-insole":
      return "/models/orthoicinsole.stl";
    default:
      return "/models/cube.stl";
  }
};

const getImagePath = (deviceId?: string | number) => {
  switch (deviceId) {
    case 1:
    case "prosthetic":
      return "/images/prosthetic_hand.jpg";
    case 2:
    case "wheelchair":
      return "/images/wheelchair.jpg";
    case 3:
    case "communication":
      return "/images/communication_board.jpg";
    case 4:
    case "adaptive-utensil":
      return "/images/adaptive_utensil.jpg";
    case 5:
    case "vision-aid":
      return "/images/vision_aid.jpg";
    case 6:
    case "orthotic-insole":
      return "/images/orthotic_insole.jpg";
    default:
      return "/images/default.jpg";
  }
};

const getDeviceName = (deviceId?: string | number) => {
  switch (deviceId) {
    case 1:
    case "prosthetic":
      return "Prosthetic Hand";
    case 2:
    case "wheelchair":
      return "Wheelchair";
    case 3:
    case "communication":
      return "Communication Board";
    case 4:
    case "adaptive-utensil":
      return "Adaptive Utensil";
    case 5:
    case "vision-aid":
      return "Vision Aid Device";
    case 6:
    case "orthotic-insole":
      return "Orthotic Insole";
    default:
      return "Default Device";
  }
};

const getColorHex = (colorName: string): number => {
  const colorMap: { [key: string]: number } = {
    'blue': 0x3b82f6,
    'red': 0xef4444,
    'green': 0x22c55e,
    'black': 0x000000,
    'white': 0xffffff,
    'gray': 0x6b7280,
    'yellow': 0xeab308,
    'orange': 0xf97316,
    'purple': 0xa855f7,
    'pink': 0xec4899,
    'cyan': 0x06b6d4,
    'lime': 0x84cc16,
    'indigo': 0x6366f1,
    'violet': 0x8b5cf6,
    'emerald': 0x10b981,
    'rose': 0xf43f5e,
    'amber': 0xf59e0b,
    'teal': 0x14b8a6,
    'sky': 0x0ea5e9,
    'slate': 0x64748b
  };
  
  const normalizedColor = colorName.toLowerCase().trim();
  return colorMap[normalizedColor] || 0xcccccc; // Default to gray if color not found
};

export const Device3DViewer = ({ deviceType, deviceId, customizations, onDownload }: Device3DViewerProps) => {
  const [showImage, setShowImage] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const modelPath = getModelPath(deviceId);
  const imagePath = getImagePath(deviceId);
  const deviceName = getDeviceName(deviceId);

  useEffect(() => {
    console.log("3D Viewer color:", customizations?.color);
    console.log("3D Viewer customizations:", customizations);
    // Dynamically import three.js and STLLoader only if not showing image
    if (!showImage && viewerRef.current) {
      (async () => {
        try {
          const THREE = await import("three");
          const { STLLoader } = await import("three-stdlib");
          const width = viewerRef.current!.clientWidth;
          const height = viewerRef.current!.clientHeight;
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
          camera.position.set(0, 0, 100);
          const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
          renderer.setSize(width, height);
          viewerRef.current!.innerHTML = "";
          viewerRef.current!.appendChild(renderer.domElement);

          // Lighting
          const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
          scene.add(ambientLight);
          const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
          directionalLight.position.set(0, 1, 1).normalize();
          scene.add(directionalLight);

          // OrbitControls
          const { OrbitControls } = await import("three-stdlib");
          const controls = new OrbitControls(camera, renderer.domElement);
          controls.enableDamping = true;
          controls.dampingFactor = 0.05;
          controls.screenSpacePanning = true;
          controls.minDistance = 10;
          controls.maxDistance = 500;

          // Load STL
          const loader = new STLLoader();
          loader.load(
            modelPath,
            (geometry) => {
              // Use custom color if provided, else default
              let colorValue = 0xcccccc;
              if (customizations?.color) {
                colorValue = getColorHex(customizations.color);
                console.log("Applied color:", customizations.color, "Hex:", colorValue);
              }
              const material = new THREE.MeshStandardMaterial({ color: colorValue, metalness: 0.3, roughness: 0.6 });
              const mesh = new THREE.Mesh(geometry, material);
              scene.add(mesh);
              
              // Apply device-specific customizations
              if (deviceId === 2 || deviceType === "wheelchair") {
                console.log("Applying wheelchair customizations:", customizations);
                
                // Apply seat height scaling (affects Y scale)
                if (customizations?.seatHeight) {
                  const heightScale = customizations.seatHeight / 45; // Normalize to default 45cm
                  mesh.scale.y = heightScale;
                  console.log("Applied seat height scale:", heightScale);
                }
                
                // Apply backrest angle (rotation around X axis)
                if (customizations?.backrestAngle) {
                  const angleRadians = (customizations.backrestAngle - 90) * (Math.PI / 180); // Convert to radians, offset from 90°
                  mesh.rotation.x = angleRadians;
                  console.log("Applied backrest angle:", customizations.backrestAngle, "radians:", angleRadians);
                }
                
                // Apply wheel size scaling (affects overall scale)
                if (customizations?.wheelSize) {
                  const wheelScale = customizations.wheelSize / 60; // Normalize to default 60cm
                  mesh.scale.x *= wheelScale;
                  mesh.scale.z *= wheelScale;
                  console.log("Applied wheel size scale:", wheelScale);
                }
              }
              
              // Prosthetic Hand customizations
              if (deviceId === 1 || deviceType === "prosthetic") {
                console.log("Applying prosthetic hand customizations:", customizations);
                
                // Apply grip strength (affects overall scale)
                if (customizations?.gripStrength) {
                  const gripScale = 0.8 + (customizations.gripStrength / 100) * 0.4; // Scale between 0.8 and 1.2
                  mesh.scale.x *= gripScale;
                  mesh.scale.z *= gripScale;
                  console.log("Applied grip strength scale:", gripScale);
                }
                
                // Apply finger length (affects Y scale)
                if (customizations?.fingerLength) {
                  const fingerScale = customizations.fingerLength / 18; // Normalize to default 18cm
                  mesh.scale.y = fingerScale;
                  console.log("Applied finger length scale:", fingerScale);
                }
                
                // Apply palm size (affects overall scale)
                if (customizations?.palmSize) {
                  const palmScale = customizations.palmSize / 9; // Normalize to default 9cm
                  mesh.scale.x *= palmScale;
                  mesh.scale.z *= palmScale;
                  console.log("Applied palm size scale:", palmScale);
                }
              }
              
              // Communication Board customizations
              if (deviceId === 3 || deviceType === "communication") {
                console.log("Applying communication board customizations:", customizations);
                
                // Apply button size (affects overall scale)
                if (customizations?.buttonSize) {
                  const buttonScale = customizations.buttonSize / 2.5; // Normalize to default 2.5cm
                  mesh.scale.x *= buttonScale;
                  mesh.scale.y *= buttonScale;
                  console.log("Applied button size scale:", buttonScale);
                }
                
                // Apply button spacing (affects Z scale)
                if (customizations?.buttonSpacing) {
                  const spacingScale = customizations.buttonSpacing / 1; // Normalize to default 1cm
                  mesh.scale.z *= spacingScale;
                  console.log("Applied button spacing scale:", spacingScale);
                }
              }
              
              // Adaptive Utensils customizations
              if (deviceId === 4 || deviceType === "adaptive-utensil") {
                console.log("Applying adaptive utensil customizations:", customizations);
                
                // Apply handle length (affects Y scale)
                if (customizations?.handleLength) {
                  const handleScale = customizations.handleLength / 12; // Normalize to default 12cm
                  mesh.scale.y = handleScale;
                  console.log("Applied handle length scale:", handleScale);
                }
                
                // Apply handle angle (rotation around Z axis)
                if (customizations?.handleAngle) {
                  const angleRadians = customizations.handleAngle * (Math.PI / 180); // Convert to radians
                  mesh.rotation.z = angleRadians;
                  console.log("Applied handle angle:", customizations.handleAngle, "radians:", angleRadians);
                }
              }
              
              // Vision Aid Device customizations
              if (deviceId === 5 || deviceType === "vision-aid") {
                console.log("Applying vision aid customizations:", customizations);
                
                // Apply vibration intensity (affects overall scale)
                if (customizations?.vibrationIntensity) {
                  const vibrationScale = 0.7 + (customizations.vibrationIntensity / 100) * 0.6; // Scale between 0.7 and 1.3
                  mesh.scale.x *= vibrationScale;
                  mesh.scale.y *= vibrationScale;
                  mesh.scale.z *= vibrationScale;
                  console.log("Applied vibration intensity scale:", vibrationScale);
                }
                
                // Apply device size (affects overall scale)
                if (customizations?.deviceSize) {
                  const deviceScale = customizations.deviceSize / 8; // Normalize to default 8cm
                  mesh.scale.x *= deviceScale;
                  mesh.scale.y *= deviceScale;
                  mesh.scale.z *= deviceScale;
                  console.log("Applied device size scale:", deviceScale);
                }
              }
              
              // Orthotic Insole customizations
              if (deviceId === 6 || deviceType === "orthotic-insole") {
                console.log("Applying orthotic insole customizations:", customizations);
                
                // Apply foot length (affects X scale)
                if (customizations?.footLength) {
                  const lengthScale = customizations.footLength / 25; // Normalize to default 25cm
                  mesh.scale.x = lengthScale;
                  console.log("Applied foot length scale:", lengthScale);
                }
                
                // Apply foot width (affects Z scale)
                if (customizations?.footWidth) {
                  const widthScale = customizations.footWidth / 9; // Normalize to default 9cm
                  mesh.scale.z = widthScale;
                  console.log("Applied foot width scale:", widthScale);
                }
                
                // Apply arch height (affects Y scale)
                if (customizations?.archHeight) {
                  const archScale = customizations.archHeight / 2.5; // Normalize to default 2.5cm
                  mesh.scale.y = archScale;
                  console.log("Applied arch height scale:", archScale);
                }
                
                // Apply heel height (affects Y scale)
                if (customizations?.heelHeight) {
                  const heelScale = customizations.heelHeight / 2; // Normalize to default 2cm
                  mesh.scale.y *= heelScale;
                  console.log("Applied heel height scale:", heelScale);
                }
              }
              
              // Center and scale
              geometry.computeBoundingBox();
              const center = geometry.boundingBox.getCenter(new THREE.Vector3());
              mesh.position.sub(center);
              // Fit to view
              const size = geometry.boundingBox.getSize(new THREE.Vector3()).length();
              camera.position.z = size * 1.5;
              // Animate
              function animate() {
                mesh.rotation.y += 0.01;
                controls.update();
                renderer.render(scene, camera);
                requestAnimationFrame(animate);
              }
              animate();
            },
            undefined,
            (error) => {
              console.error("Error loading STL:", error);
              setShowImage(true);
            }
          );
        } catch (e) {
          console.error("Error in 3D viewer:", e);
          setShowImage(true);
        }
      })();
    }
  }, [modelPath, showImage, customizations?.color, customizations?.seatHeight, customizations?.backrestAngle, customizations?.wheelSize, customizations?.gripStrength, customizations?.fingerLength, customizations?.palmSize, customizations?.buttonSize, customizations?.buttonSpacing, customizations?.handleLength, customizations?.handleAngle, customizations?.footLength, customizations?.footWidth, customizations?.archHeight, customizations?.heelHeight, customizations?.vibrationIntensity, customizations?.deviceSize]);

  return (
    <Card className="w-full relative overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-center mb-2">{deviceName}</h3>
        <div className="aspect-square w-full" ref={viewerRef} style={{ minHeight: 320, background: '#fff', borderRadius: '0.5rem' }}>
          {showImage && (
            <img src={imagePath} alt={deviceName} className="w-full h-full object-contain rounded" />
          )}
        </div>
        {onDownload && (
          <div className="absolute top-4 right-4">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={onDownload}
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}; 