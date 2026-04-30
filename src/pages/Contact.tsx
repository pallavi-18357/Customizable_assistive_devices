import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, MessageSquare, User, Award, Clock } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
  };

  const experts = [
    {
      id: 1,
      name: "Dr. Sarah Mitchell",
      specialization: "Prosthetics & Orthotics",
      experience: "15+ years",
      email: "sarah.mitchell@assisttech.com",
      phone: "+1 (555) 123-4567",
      bio: "Specialist in upper limb prosthetics and custom orthotic devices. Expert in 3D printing technologies for assistive devices.",
      availability: "Mon-Fri, 9AM-5PM EST"
    },
    {
      id: 2,
      name: "Dr. James Rodriguez",
      specialization: "Mobility Aids & Wheelchairs",
      experience: "12+ years",
      email: "james.rodriguez@assisttech.com",
      phone: "+1 (555) 123-4568",
      bio: "Focused on mobility solutions, wheelchair customization, and adaptive transportation devices.",
      availability: "Tue-Sat, 10AM-6PM EST"
    },
    {
      id: 3,
      name: "Dr. Emily Chen",
      specialization: "Communication & Cognitive Aids",
      experience: "10+ years",
      email: "emily.chen@assisttech.com",
      phone: "+1 (555) 123-4569",
      bio: "Expert in assistive communication devices, cognitive aids, and adaptive computer interfaces.",
      availability: "Mon-Wed-Fri, 8AM-4PM EST"
    },
    {
      id: 4,
      name: "Dr. Michael Thompson",
      specialization: "Daily Living Aids",
      experience: "8+ years",
      email: "michael.thompson@assisttech.com",
      phone: "+1 (555) 123-4570",
      bio: "Specializes in adaptive tools for daily activities, kitchen aids, and home modification solutions.",
      availability: "Mon-Thu, 9AM-5PM EST"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 min-h-screen">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Our Experts
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Need help customizing your assistive device? Our team of experts is here to guide you through the process.
          </p>
        </div>

        {/* Expert Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Expert Team</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {experts.map((expert) => (
              <Card key={expert.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl flex items-center">
                        <User className="w-5 h-5 mr-2 text-blue-600" />
                        {expert.name}
                      </CardTitle>
                      <p className="text-blue-600 font-semibold mt-1">{expert.specialization}</p>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Award className="w-4 h-4 mr-1" />
                      {expert.experience}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{expert.bio}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                      <a href={`mailto:${expert.email}`} className="text-blue-600 hover:underline">
                        {expert.email}
                      </a>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                      <a href={`tel:${expert.phone}`} className="text-blue-600 hover:underline">
                        {expert.phone}
                      </a>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      {expert.availability}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => toast.success(`Consultation request sent to ${expert.name}`)}
                  >
                    Schedule Consultation
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Send us a message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" required />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={5} required />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Mail className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-semibold">General Email</h3>
                    <p className="text-gray-600">support@assisttech.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Phone className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-semibold">Main Office</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-gray-600">
                      123 Innovation Drive<br />
                      Tech City, TC 12345
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-blue-900 mb-2">24/7 Emergency Support</h3>
                <p className="text-blue-700 mb-4">
                  For urgent device issues or emergency consultations, our on-call experts are available 24/7.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Emergency Contact: +1 (555) 911-HELP
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
