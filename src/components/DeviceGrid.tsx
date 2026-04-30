import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Users } from "lucide-react";

export const devices = [
  {
    id: 1,
    name: "Custom Prosthetic Hand",
    category: "Prosthetics",
    description: "3D printed prosthetic hand with customizable grip strength and finger positioning",
    longDescription: "This prosthetic hand represents the latest in assistive technology, combining advanced materials with precision engineering. Each finger can be individually customized for optimal grip patterns, and the palm size can be adjusted to match the user's specific measurements.",
    image: "https://images.unsplash.com/photo-1727386244869-82858f2a7f91?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3VzdG9tJTIwcHJvc3RoZXRpYyUyMGhhbmR8ZW58MHx8MHx8fDA%3D",
    downloads: 1234,
    rating: 4.8,
    reviews: 89,
    difficulty: "Intermediate",
    printTime: "8-12 hours",
    materials: ["PLA", "TPU", "Metal inserts"],
    fileSize: "2.4 MB",
    deviceType: "prosthetic",
    lastUpdated: "August 1, 2024"
  },
  {
    id: 2,
    name: "Wheelchair Accessory Kit",
    category: "Mobility",
    description: "Modular accessories for wheelchair customization including cup holders and storage",
    longDescription: "Enhance your mobility with this versatile accessory kit for wheelchairs. Includes durable cup holders, storage pouches, and attachment points for various tools and gadgets.",
    image: "https://images.unsplash.com/photo-1656663659028-a4898c21433a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdoZWVsY2hhaXIlMjBhY2Nlc3NvcnklMjBraXR8ZW58MHx8MHx8fDA%3D",
    downloads: 856,
    rating: 4.9,
    reviews: 75,
    difficulty: "Beginner",
    printTime: "2-4 hours per accessory",
    materials: ["PETG", "ABS"],
    fileSize: "0.8 MB",
    deviceType: "wheelchair",
    lastUpdated: "July 25, 2024"
  },
  {
    id: 3,
    name: "Communication Board",
    category: "Communication",
    description: "Customizable AAC communication board with tactile feedback",
    longDescription: "Aids in communication for individuals with speech impairments. Features large, customizable buttons with tactile feedback and ability to load personalized icons and phrases.",
    image: "https://media.istockphoto.com/id/2180586895/photo/senior-man-having-fun-with-nurse-playing-board-skill-games.webp?a=1&b=1&s=612x612&w=0&k=20&c=nV4C3Sa8dJgXFe4oGHMewLNMVUmgOah9Dopp8N1R_1M=",
    downloads: 642,
    rating: 4.7,
    reviews: 60,
    difficulty: "Beginner",
    printTime: "6-10 hours",
    materials: ["PLA"],
    fileSize: "1.5 MB",
    deviceType: "communication",
    lastUpdated: "July 30, 2024"
  },
  {
    id: 4,
    name: "Adaptive Utensils",
    category: "Daily Living",
    description: "Ergonomic eating utensils with adjustable grips for various hand conditions",
    longDescription: "Designed for ease of use for individuals with limited hand mobility. The grips can be adjusted in size and angle for a comfortable and secure hold.",
    image: "https://media.istockphoto.com/id/105863327/photo/cutlery.webp?a=1&b=1&s=612x612&w=0&k=20&c=oeXrMfOuU3gGSYFP4BK0zwMTy1MpqGQgYjPp4zxX36c=",
    downloads: 978,
    rating: 4.6,
    reviews: 95,
    difficulty: "Beginner",
    printTime: "3-5 hours per utensil",
    materials: ["PLA", "TPU"],
    fileSize: "0.5 MB",
    deviceType: "adaptive-utensil",
    lastUpdated: "August 2, 2024"
  },
  {
    id: 5,
    name: "Vision Aid Device",
    category: "Sensory",
    description: "Tactile navigation aid with customizable vibration patterns",
    longDescription: "A handheld device that provides tactile feedback and directional guidance through customizable vibration patterns, assisting individuals with visual impairments in navigation.",
    image: "https://media.istockphoto.com/id/2166794477/photo/happy-young-blind-man-recording-voice-message-on-smartphone-walking-in-city-park.webp?a=1&b=1&s=612x612&w=0&k=20&c=_qJyDrKxm5PQar7yba-2u-J5fnmp3xFI0AxMEF7lmBs=",
    downloads: 445,
    rating: 4.5,
    reviews: 40,
    difficulty: "Advanced",
    printTime: "10-15 hours",
    materials: ["ABS", "TPU"],
    fileSize: "3.0 MB",
    deviceType: "vision-aid",
    lastUpdated: "July 28, 2024"
  },
  {
    id: 6,
    name: "Orthotic Insole",
    category: "Orthopedics",
    description: "Custom-fitted orthotic insoles based on foot scan measurements",
    longDescription: "Provides personalized arch support and cushioning based on precise foot measurements. Helps alleviate foot pain and improve posture.",
    image: "https://media.istockphoto.com/id/1368980481/photo/doctor-consulting-patient-on-custom-orthotic-insoles-in-a-clinic-for-a-personalised-custom-fit.webp?a=1&b=1&s=612x612&w=0&k=20&c=ADu_0h8ouGRSNWpN7lUif8ggfSL-MXR7Mp2ciVhocOg=",
    downloads: 723,
    rating: 4.8,
    reviews: 110,
    difficulty: "Intermediate",
    printTime: "5-8 hours",
    materials: ["TPU", "PLA"],
    fileSize: "1.2 MB",
    deviceType: "orthotic-insole",
    lastUpdated: "July 31, 2024"
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
              <Link to={`/customize/${device.deviceType}`}>
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
