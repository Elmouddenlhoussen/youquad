
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Index from "./pages/Index";
import Quads from "./pages/Quads";
import QuadDetail from "./pages/QuadDetail";
import QuadComparison from "./pages/QuadComparison"; // New page
import Tours from "./pages/Tours";
import About from "./pages/About";
import EnhancedAbout from "./pages/EnhancedAbout"; // Enhanced about page
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import EnhancedBooking from "./pages/EnhancedBooking"; // Enhanced booking page
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Gallery from "./pages/Gallery"; // New gallery page
import FAQ from "./pages/FAQ"; // New FAQ page
import Blog from "./pages/Blog"; // New blog page
import UserProfile from "./pages/UserProfile"; // New user profile page
import PaymentSuccess from "./pages/PaymentSuccess"; // New payment success page
import { ThemeProvider } from "./hooks/useTheme";
import { UserProvider } from "./contexts/UserContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <UserProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/quads" element={<Quads />} />
                <Route path="/quad/:id" element={<QuadDetail />} />
                <Route path="/quad-comparison" element={<QuadComparison />} />
                <Route path="/tours" element={<Tours />} />
                <Route path="/about" element={<About />} />
                <Route path="/enhanced-about" element={<EnhancedAbout />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/enhanced-booking" element={<EnhancedBooking />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/login" element={<Login />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </UserProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
