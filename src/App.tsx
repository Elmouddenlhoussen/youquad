
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Index from "./pages/Index";
import Quads from "./pages/Quads";
import QuadDetail from "./pages/QuadDetail";
import QuadComparison from "./pages/QuadComparison";
import Tours from "./pages/Tours";
import About from "./pages/About";
import EnhancedAbout from "./pages/EnhancedAbout";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import EnhancedBooking from "./pages/EnhancedBooking";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Gallery from "./pages/Gallery";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import UserProfile from "./pages/UserProfile";
import PaymentSuccess from "./pages/PaymentSuccess";
import Search from "./pages/Search"; // New search page
import { ThemeProvider } from "./hooks/useTheme";
import { UserProvider } from "./contexts/UserContext";
import AuthGuard from "./components/AuthGuard";

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
                <Route path="/search" element={<Search />} /> {/* New search route */}
                <Route path="/profile" element={
                  <AuthGuard>
                    <UserProfile />
                  </AuthGuard>
                } />
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
