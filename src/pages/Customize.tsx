import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { ArrowRight, Wrench, Palette, Download } from "lucide-react";

const Customize = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 min-h-screen">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Customize Your Device
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create a personalized assistive device tailored to your specific needs and preferences.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle>Functional Design</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Adjust dimensions, grip strength, and mechanical properties to match your specific requirements.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle>Visual Customization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Choose colors, patterns, and surface textures that reflect your personal style.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle>3D Print Ready</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Download optimized STL files ready for 3D printing with detailed instructions.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Start Customizing
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Customize;
