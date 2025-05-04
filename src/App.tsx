
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
import Search from "./pages/Search";
import Admin from "./pages/Admin";
import AdminContent from "./pages/AdminContent";
import AdminGallery from "./pages/AdminGallery";
import AdminUsers from "./pages/AdminUsers";
import AdminBookings from "./pages/AdminBookings";
import AdminReviews from "./pages/AdminReviews";
import AdminSettings from "./pages/AdminSettings";
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
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Layout><Index /></Layout>} />
              <Route path="/quads" element={<Layout><Quads /></Layout>} />
              <Route path="/quad/:id" element={<Layout><QuadDetail /></Layout>} />
              <Route path="/quad-comparison" element={<Layout><QuadComparison /></Layout>} />
              <Route path="/tours" element={<Layout><Tours /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/enhanced-about" element={<Layout><EnhancedAbout /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />
              <Route path="/booking" element={<Layout><Booking /></Layout>} />
              <Route path="/enhanced-booking" element={<Layout><EnhancedBooking /></Layout>} />
              <Route path="/payment-success" element={<Layout><PaymentSuccess /></Layout>} />
              <Route path="/login" element={<Layout><Login /></Layout>} />
              <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
              <Route path="/faq" element={<Layout><FAQ /></Layout>} />
              <Route path="/blog" element={<Layout><Blog /></Layout>} />
              <Route path="/search" element={<Layout><Search /></Layout>} />
              <Route path="/profile" element={
                <Layout>
                  <AuthGuard>
                    <UserProfile />
                  </AuthGuard>
                </Layout>
              } />
              
              {/* Admin routes */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/content" element={<AdminContent />} />
              <Route path="/admin/gallery" element={<AdminGallery />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/bookings" element={<AdminBookings />} />
              <Route path="/admin/reviews" element={<AdminReviews />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </UserProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
