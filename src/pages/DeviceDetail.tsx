
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Heart, Share2, Star } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Device3DViewer } from "@/components/Device3DViewer";
import { toast } from "sonner";
import { saveAs } from "file-saver";

const DeviceDetail = () => {
  const { id } = useParams();
  const [liked, setLiked] = useState(false);

  // Mock device data
  const device = {
    id: id,
    name: "Custom Prosthetic Hand",
    category: "Prosthetics",
    description: "Advanced 3D printed prosthetic hand with customizable grip strength and finger positioning. Designed for maximum functionality and comfort.",
    longDescription: "This prosthetic hand represents the latest in assistive technology, combining advanced materials with precision engineering. Each finger can be individually customized for optimal grip patterns, and the palm size can be adjusted to match the user's specific measurements.",
    rating: 4.8,
    downloads: 1234,
    reviews: 89,
    difficulty: "Intermediate",
    printTime: "8-12 hours",
    materials: ["PLA", "TPU", "Metal inserts"],
    fileSize: "2.4 MB",
    lastUpdated: "2024-01-15"
  };

  const handleDownload = () => {
    // Simulate STL file download
    const blob = new Blob(["STL file content would be here"], { type: "application/octet-stream" });
    saveAs(blob, `${device.name.replace(/\s+/g, '_')}.stl`);
    toast.success("STL file downloaded successfully!");
  };

  const handleLike = () => {
    setLiked(!liked);
    toast.success(liked ? "Removed from favorites" : "Added to favorites");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link to="/devices" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Devices
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 3D Viewer */}
          <div className="space-y-4">
            <Device3DViewer deviceType="prosthetic" onDownload={handleDownload} />
            
            {/* Quick Actions */}
            <div className="flex gap-2">
              <Button 
                onClick={handleLike}
                variant="outline" 
                className={`flex-1 ${liked ? 'text-red-500 border-red-200' : ''}`}
              >
                <Heart className={`w-4 h-4 mr-2 ${liked ? 'fill-current' : ''}`} />
                {liked ? 'Liked' : 'Like'}
              </Button>
              <Button onClick={handleShare} variant="outline" className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Link to={`/customize/${device.id}`} className="flex-1">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Customize
                </Button>
              </Link>
            </div>
          </div>

          {/* Device Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{device.category}</Badge>
                <Badge variant={device.difficulty === "Beginner" ? "default" : "secondary"}>
                  {device.difficulty}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{device.name}</h1>
              <p className="text-lg text-gray-600 mb-4">{device.description}</p>
              
              {/* Stats */}
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 fill-current mr-1" />
                  <span className="font-medium">{device.rating}</span>
                  <span className="text-gray-500 ml-1">({device.reviews} reviews)</span>
                </div>
                <div className="flex items-center">
                  <Download className="w-5 h-5 text-gray-500 mr-1" />
                  <span className="text-gray-600">{device.downloads} downloads</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{device.longDescription}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="specs" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Specifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Print Time:</span>
                      <span className="font-medium">{device.printTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Materials:</span>
                      <span className="font-medium">{device.materials.join(", ")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">File Size:</span>
                      <span className="font-medium">{device.fileSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="font-medium">{device.lastUpdated}</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>User Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Mock reviews */}
                      <div className="border-b pb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                          <span className="font-medium">Sarah M.</span>
                          <span className="text-gray-500 text-sm">2 weeks ago</span>
                        </div>
                        <p className="text-gray-600">
                          Excellent design! The customization options made it perfect for my needs. 
                          Print quality was outstanding.
                        </p>
                      </div>
                      <div className="border-b pb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex text-yellow-500">
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                            <Star className="w-4 h-4 text-gray-300" />
                          </div>
                          <span className="font-medium">John D.</span>
                          <span className="text-gray-500 text-sm">1 month ago</span>
                        </div>
                        <p className="text-gray-600">
                          Great functionality, though the assembly instructions could be clearer. 
                          Overall very satisfied with the result.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Download Button */}
            <Button 
              onClick={handleDownload}
              size="lg" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Download className="w-5 h-5 mr-2" />
              Download STL File ({device.fileSize})
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeviceDetail;
