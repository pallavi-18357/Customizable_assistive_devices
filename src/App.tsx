import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Devices from "./pages/Devices";
import Customize from "./pages/Customize";
import MyDesigns from "./pages/MyDesigns";
import Contact from "./pages/Contact";
import DeviceDetail from "./pages/DeviceDetail";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Footer from "@/components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Devices />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/customize" element={<Customize />} />
            <Route path="/customize/:deviceType" element={<Customize />} />
            <Route path="/my-designs" element={<MyDesigns />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/device/:id" element={<DeviceDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;