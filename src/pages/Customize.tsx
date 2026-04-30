import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wrench, Palette, Download, Save, Accessibility, MessageCircle, Utensils } from "lucide-react";
import { Device3DViewer } from "@/components/ui/Device3DViewer";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useParams, useNavigate } from "react-router-dom";
import { devices } from "@/components/DeviceGrid";

const deviceTypes = [
  { id: "prosthetic", name: "Prosthetic Hand", description: "Customizable prosthetic hand with adjustable grip and finger positioning", icon: Wrench },
  { id: "wheelchair", name: "Wheelchair", description: "Personalized wheelchair with adjustable seat and backrest", icon: Accessibility },
  { id: "communication", name: "Communication Device", description: "Adaptive communication device with customizable buttons", icon: MessageCircle },
  { id: "adaptive-utensil", name: "Adaptive Utensils", description: "Ergonomic eating utensils with adjustable grips", icon: Utensils },
  { id: "vision-aid", name: "Vision Aid Device", description: "Tactile navigation aid with customizable patterns", icon: Accessibility },
  { id: "orthotic-insole", name: "Orthotic Insole", description: "Custom-fitted orthotic insoles for foot support", icon: Wrench }
];

const Customize = () => {
  const { deviceType } = useParams();
  const navigate = useNavigate();
  const device = devices.find(d => d.deviceType === deviceType);

  const [customizations, setCustomizations] = useState({
    color: "blue",
    material: "PLA",
    // Prosthetic customizations
    gripStrength: 50,
    fingerLengthValue: 18, // default in cm
    fingerLengthUnit: "cm",
    palmSizeValue: 9, // default in cm
    palmSizeUnit: "cm",
    // Wheelchair customizations
    seatHeightValue: 45, // default in cm
    seatHeightUnit: "cm",
    backrestAngle: 90, // degrees
    wheelSizeValue: 60, // default in cm
    wheelSizeUnit: "cm",
    // Communication device customizations
    buttonSizeValue: 2.5, // default in cm
    buttonSizeUnit: "cm",
    buttonSpacingValue: 1, // default in cm
    buttonSpacingUnit: "cm",
    // Daily living aid (foot/insole) customizations
    footLengthValue: 25, // cm
    footLengthUnit: "cm",
    footWidthValue: 9, // cm
    footWidthUnit: "cm",
    archHeightValue: 2.5, // cm
    archHeightUnit: "cm",
    heelHeightValue: 2, // cm
    heelHeightUnit: "cm",
    // Adaptive utensil customizations
    handleLengthValue: 12, // default in cm
    handleLengthUnit: "cm",
    handleAngle: 15, // default in degrees
    // Vision aid customizations
    vibrationIntensity: 50, // default in %
    deviceSizeValue: 8, // default in cm
    deviceSizeUnit: "cm"
  });

  const handleCustomizationChange = (key: string, value: number | string) => {
    setCustomizations(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toCm = (value: number, unit: string) => unit === "in" ? value * 2.54 : value;
  const toMm = (value: number, unit: string) => unit === "in" ? value * 25.4 : unit === "cm" ? value * 10 : value;
  const toDegrees = (value: number) => value; // already in degrees

  const viewerCustomizations = {
    ...customizations,
    fingerLength: toCm(customizations.fingerLengthValue, customizations.fingerLengthUnit),
    palmSize: toCm(customizations.palmSizeValue, customizations.palmSizeUnit),
    seatHeight: toCm(customizations.seatHeightValue, customizations.seatHeightUnit),
    backrestAngle: customizations.backrestAngle, // degrees
    wheelSize: toCm(customizations.wheelSizeValue, customizations.wheelSizeUnit),
    buttonSize: toCm(customizations.buttonSizeValue, customizations.buttonSizeUnit),
    buttonSpacing: toCm(customizations.buttonSpacingValue, customizations.buttonSpacingUnit),
    // Daily living aid (foot/insole)
    footLength: toCm(customizations.footLengthValue, customizations.footLengthUnit),
    footWidth: toCm(customizations.footWidthValue, customizations.footWidthUnit),
    archHeight: toCm(customizations.archHeightValue, customizations.archHeightUnit),
    heelHeight: toCm(customizations.heelHeightValue, customizations.heelHeightUnit),
    // Adaptive utensil
    handleLength: toCm(customizations.handleLengthValue, customizations.handleLengthUnit),
    handleAngle: customizations.handleAngle, // degrees,
    // Vision aid
    vibrationIntensity: customizations.vibrationIntensity, // %
    deviceSize: toCm(customizations.deviceSizeValue, customizations.deviceSizeUnit)
  };

  const handleSave = () => {
    // Here you would typically save to a backend
    toast.success("Customization saved successfully!");
  };

  const handleDownload = () => {
    // Here you would typically generate and download the STL file
    const data = JSON.stringify(customizations, null, 2);
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${deviceType}_customization.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Customization details downloaded successfully!");
  };

  const getCustomizationControls = () => {
    switch (deviceType) {
      case "prosthetic":
        return (
          <>
            <div className="space-y-2">
              <Label>Grip Strength</Label>
              <Slider
                value={[customizations.gripStrength]}
                onValueChange={(value) => handleCustomizationChange('gripStrength', value[0])}
                min={0}
                max={100}
                step={1}
              />
            </div>
            <div className="space-y-2">
              <Label>Finger Length</Label>
              <div className="flex gap-2 items-center">
                <input type="number" min={5} max={30} step={0.1} value={customizations.fingerLengthValue} onChange={e => handleCustomizationChange('fingerLengthValue', parseFloat(e.target.value))} className="input input-bordered w-24" />
                <select value={customizations.fingerLengthUnit} onChange={e => handleCustomizationChange('fingerLengthUnit', e.target.value)} className="select select-bordered">
                  <option value="cm">cm</option>
                  <option value="in">in</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Palm Size</Label>
              <div className="flex gap-2 items-center">
                <input type="number" min={5} max={15} step={0.1} value={customizations.palmSizeValue} onChange={e => handleCustomizationChange('palmSizeValue', parseFloat(e.target.value))} className="input input-bordered w-24" />
                <select value={customizations.palmSizeUnit} onChange={e => handleCustomizationChange('palmSizeUnit', e.target.value)} className="select select-bordered">
                  <option value="cm">cm</option>
                  <option value="in">in</option>
                </select>
              </div>
            </div>
          </>
        );
      case "wheelchair":
        return (
          <>
            <div className="space-y-2">
              <Label>Seat Height</Label>
              <div className="flex gap-2 items-center">
                <input type="number" min={30} max={60} step={0.1} value={customizations.seatHeightValue} onChange={e => handleCustomizationChange('seatHeightValue', parseFloat(e.target.value))} className="input input-bordered w-24" />
                <select value={customizations.seatHeightUnit} onChange={e => handleCustomizationChange('seatHeightUnit', e.target.value)} className="select select-bordered">
                  <option value="cm">cm</option>
                  <option value="in">in</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Backrest Angle</Label>
              <div className="flex gap-2 items-center">
                <input type="number" min={70} max={120} step={1} value={customizations.backrestAngle} onChange={e => handleCustomizationChange('backrestAngle', parseFloat(e.target.value))} className="input input-bordered w-24" />
                <span>°</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Wheel Size</Label>
              <div className="flex gap-2 items-center">
                <input type="number" min={40} max={70} step={0.1} value={customizations.wheelSizeValue} onChange={e => handleCustomizationChange('wheelSizeValue', parseFloat(e.target.value))} className="input input-bordered w-24" />
                <select value={customizations.wheelSizeUnit} onChange={e => handleCustomizationChange('wheelSizeUnit', e.target.value)} className="select select-bordered">
                  <option value="cm">cm</option>
                  <option value="in">in</option>
                </select>
              </div>
            </div>
          </>
        );
      case "communication":
        return (
          <>
            <div className="space-y-2">
              <Label>Button Size</Label>
              <div className="flex gap-2 items-center">
                <input type="number" min={1} max={5} step={0.1} value={customizations.buttonSizeValue} onChange={e => handleCustomizationChange('buttonSizeValue', parseFloat(e.target.value))} className="input input-bordered w-24" />
                <select value={customizations.buttonSizeUnit} onChange={e => handleCustomizationChange('buttonSizeUnit', e.target.value)} className="select select-bordered">
                  <option value="cm">cm</option>
                  <option value="in">in</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Button Spacing</Label>
              <div className="flex gap-2 items-center">
                <input type="number" min={0.5} max={3} step={0.1} value={customizations.buttonSpacingValue} onChange={e => handleCustomizationChange('buttonSpacingValue', parseFloat(e.target.value))} className="input input-bordered w-24" />
                <select value={customizations.buttonSpacingUnit} onChange={e => handleCustomizationChange('buttonSpacingUnit', e.target.value)} className="select select-bordered">
                  <option value="cm">cm</option>
                  <option value="in">in</option>
                </select>
              </div>
            </div>
          </>
        );
      case "adaptive-utensil":
        return (
          <>
            <div className="space-y-2">
              <Label>Handle Length</Label>
              <div className="flex gap-2 items-center">
                <input type="number" min={8} max={20} step={0.1} value={customizations.handleLengthValue || 12} onChange={e => handleCustomizationChange('handleLengthValue', parseFloat(e.target.value))} className="input input-bordered w-24" />
                <select value={customizations.handleLengthUnit || "cm"} onChange={e => handleCustomizationChange('handleLengthUnit', e.target.value)} className="select select-bordered">
                  <option value="cm">cm</option>
                  <option value="in">in</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Handle Angle</Label>
              <div className="flex gap-2 items-center">
                <input type="number" min={0} max={45} step={1} value={customizations.handleAngle || 15} onChange={e => handleCustomizationChange('handleAngle', parseFloat(e.target.value))} className="input input-bordered w-24" />
                <span>°</span>
              </div>
            </div>
          </>
        );
      case "vision-aid":
        return (
          <>
            <div className="space-y-2">
              <Label>Vibration Intensity</Label>
              <Slider
                value={[customizations.vibrationIntensity || 50]}
                onValueChange={(value) => handleCustomizationChange('vibrationIntensity', value[0])}
                min={0}
                max={100}
                step={1}
              />
            </div>
            <div className="space-y-2">
              <Label>Device Size</Label>
              <div className="flex gap-2 items-center">
                <input type="number" min={5} max={15} step={0.1} value={customizations.deviceSizeValue || 8} onChange={e => handleCustomizationChange('deviceSizeValue', parseFloat(e.target.value))} className="input input-bordered w-24" />
                <select value={customizations.deviceSizeUnit || "cm"} onChange={e => handleCustomizationChange('deviceSizeUnit', e.target.value)} className="select select-bordered">
                  <option value="cm">cm</option>
                  <option value="in">in</option>
                </select>
              </div>
            </div>
          </>
        );
      case "orthotic-insole":
        return (
          <>
            <div className="space-y-2">
              <Label>Foot Length</Label>
              <div className="flex gap-2 items-center">
                <input type="number" min={18} max={32} step={0.1} value={customizations.footLengthValue} onChange={e => handleCustomizationChange('footLengthValue', parseFloat(e.target.value))} className="input input-bordered w-24" />
                <select value={customizations.footLengthUnit} onChange={e => handleCustomizationChange('footLengthUnit', e.target.value)} className="select select-bordered">
                  <option value="cm">cm</option>
                  <option value="in">in</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Foot Width</Label>
              <div className="flex gap-2 items-center">
                <input type="number" min={6} max={14} step={0.1} value={customizations.footWidthValue} onChange={e => handleCustomizationChange('footWidthValue', parseFloat(e.target.value))} className="input input-bordered w-24" />
                <select value={customizations.footWidthUnit} onChange={e => handleCustomizationChange('footWidthUnit', e.target.value)} className="select select-bordered">
                  <option value="cm">cm</option>
                  <option value="in">in</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Arch Height</Label>
              <div className="flex gap-2 items-center">
                <input type="number" min={1} max={5} step={0.1} value={customizations.archHeightValue} onChange={e => handleCustomizationChange('archHeightValue', parseFloat(e.target.value))} className="input input-bordered w-24" />
                <select value={customizations.archHeightUnit} onChange={e => handleCustomizationChange('archHeightUnit', e.target.value)} className="select select-bordered">
                  <option value="cm">cm</option>
                  <option value="in">in</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Heel Height</Label>
              <div className="flex gap-2 items-center">
                <input type="number" min={1} max={5} step={0.1} value={customizations.heelHeightValue} onChange={e => handleCustomizationChange('heelHeightValue', parseFloat(e.target.value))} className="input input-bordered w-24" />
                <select value={customizations.heelHeightUnit} onChange={e => handleCustomizationChange('heelHeightUnit', e.target.value)} className="select select-bordered">
                  <option value="cm">cm</option>
                  <option value="in">in</option>
                </select>
              </div>
            </div>
          </>
        );
      default:
        return (
          <div className="text-center text-gray-500">
            <p>Customization controls for this device type are coming soon!</p>
          </div>
        );
    }
  };

  // If no device type is selected, show the device type selector
  if (!deviceType) {
    return (
      <div className="min-h-screen bg-gray-50 relative overflow-hidden">
        {/* Animated background with floating shapes */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-10" style={{ 
            background: 'radial-gradient(circle at top left, #e0f2fe, transparent 50%), radial-gradient(circle at bottom right, #ede9fe, transparent 50%)',
            animation: 'floatBackground 20s ease-in-out infinite alternate'
          }}>
            <style>{`
              @keyframes floatBackground {
                0% { transform: translate(0, 0); }
                100% { transform: translate(10%, 10%); }
              }
            `}</style>
          </div>
          
          {/* Floating circles */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <Navigation className="relative z-10"/>
        
        <main className="container mx-auto px-4 py-8 min-h-screen relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              Choose a Device to Customize
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in animation-delay-200">
              Select the type of assistive device you'd like to customize.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deviceTypes.map((type, index) => (
              <Card 
                key={type.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center p-6 bg-white/80 backdrop-blur-sm hover:scale-105 hover:bg-white animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
                onClick={() => navigate(`/customize/${type.id}`)}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                  <type.icon className="w-8 h-8 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <CardHeader className="pt-0">
                  <CardTitle className="text-xl font-semibold">{type.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600 text-sm">{type.description}</p>
                </CardContent>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                    Start Customizing
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 min-h-screen">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Customize Your {deviceType.charAt(0).toUpperCase() + deviceType.slice(1)}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create a personalized assistive device tailored to your specific needs and preferences.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 3D Viewer */}
          <div className="space-y-4">
            <Device3DViewer 
              deviceType={deviceType}
              deviceId={device?.id}
              customizations={viewerCustomizations}
              onDownload={handleDownload}
            />
          </div>

          {/* Customization Controls */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="w-5 h-5" />
                  Functional Design
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {getCustomizationControls()}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Visual Customization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Color</Label>
                  <Select
                    value={customizations.color}
                    onValueChange={(value) => handleCustomizationChange('color', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="black">Black</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Material</Label>
                  <Select
                    value={customizations.material}
                    onValueChange={(value) => handleCustomizationChange('material', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PLA">PLA</SelectItem>
                      <SelectItem value="ABS">ABS</SelectItem>
                      <SelectItem value="TPU">TPU</SelectItem>
                      <SelectItem value="PETG">PETG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={handleSave}
              >
                <Save className="mr-2 w-5 h-5" />
                Save Design
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="flex-1"
                onClick={handleDownload}
              >
                <Download className="mr-2 w-5 h-5" />
                Download Customization Details
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Customize;
