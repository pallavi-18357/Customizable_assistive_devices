
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Users } from "lucide-react";

const devices = [
  {
    id: 1,
    name: "Custom Prosthetic Hand",
    category: "Prosthetics",
    description: "3D printed prosthetic hand with customizable grip strength and finger positioning",
    image: "/placeholder.svg",
    downloads: 1234,
    rating: 4.8,
    difficulty: "Intermediate"
  },
  {
    id: 2,
    name: "Wheelchair Accessory Kit",
    category: "Mobility",
    description: "Modular accessories for wheelchair customization including cup holders and storage",
    image: "/placeholder.svg",
    downloads: 856,
    rating: 4.9,
    difficulty: "Beginner"
  },
  {
    id: 3,
    name: "Communication Board",
    category: "Communication",
    description: "Customizable AAC communication board with tactile feedback",
    image: "/placeholder.svg",
    downloads: 642,
    rating: 4.7,
    difficulty: "Beginner"
  },
  {
    id: 4,
    name: "Adaptive Utensils",
    category: "Daily Living",
    description: "Ergonomic eating utensils with adjustable grips for various hand conditions",
    image: "/placeholder.svg",
    downloads: 978,
    rating: 4.6,
    difficulty: "Beginner"
  },
  {
    id: 5,
    name: "Vision Aid Device",
    category: "Sensory",
    description: "Tactile navigation aid with customizable vibration patterns",
    image: "/placeholder.svg",
    downloads: 445,
    rating: 4.5,
    difficulty: "Advanced"
  },
  {
    id: 6,
    name: "Orthotic Insole",
    category: "Orthopedics",
    description: "Custom-fitted orthotic insoles based on foot scan measurements",
    image: "/placeholder.svg",
    downloads: 723,
    rating: 4.8,
    difficulty: "Intermediate"
  }
];

export const DeviceGrid = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {devices.map((device) => (
        <Card key={device.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
          <div className="relative">
            <img 
              src={device.image} 
              alt={device.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-white/90 text-gray-700">
                {device.category}
              </Badge>
            </div>
            <div className="absolute top-4 right-4">
              <Badge 
                variant={device.difficulty === "Beginner" ? "default" : device.difficulty === "Intermediate" ? "secondary" : "destructive"}
                className="bg-white/90"
              >
                {device.difficulty}
              </Badge>
            </div>
          </div>
          
          <CardHeader className="pb-2">
            <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
              {device.name}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              {device.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Download className="w-4 h-4 mr-1" />
                {device.downloads}
              </div>
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="ml-1">{device.rating}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Link to={`/device/${device.id}`} className="flex-1">
                <Button className="w-full" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View 3D
                </Button>
              </Link>
              <Link to={`/customize/${device.id}`}>
                <Button variant="outline" size="sm">
                  Customize
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
