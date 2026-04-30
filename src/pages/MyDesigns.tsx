import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Eye, Download, Edit, Trash2 } from "lucide-react";

const MyDesigns = () => {
  const designs = [
    {
      id: 1,
      name: "My Custom Prosthetic Hand",
      category: "Prosthetics",
      status: "Completed",
      lastModified: "2024-01-20",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Adaptive Utensil Set",
      category: "Daily Living",
      status: "In Progress",
      lastModified: "2024-01-18",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My Designs</h1>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Create New Design
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.map((design) => (
            <Card key={design.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={design.image} 
                  alt={design.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 right-4">
                  <Badge 
                    variant={design.status === "Completed" ? "default" : "secondary"}
                  >
                    {design.status}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg">{design.name}</CardTitle>
                <p className="text-sm text-gray-600">{design.category}</p>
                <p className="text-xs text-gray-500">Modified: {design.lastModified}</p>
              </CardHeader>
              
              <CardContent>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyDesigns;
