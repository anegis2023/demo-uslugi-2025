
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ServiceDetail from "./pages/ServiceDetail";
import EventsList from "./pages/EventsList";
import EventDetail from "./pages/EventDetail";
import NotFound from "./pages/NotFound";
import ThankYouPage from "./components/ThankYouPage";
import ScrollToTopButton from "./components/ScrollToTopButton";
import FloatingContactButton from "./components/FloatingContactButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTopButton />
        <FloatingContactButton />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/uslugi/:serviceId" element={<ServiceDetail />} />
          <Route path="/wydarzenia" element={<EventsList />} />
          <Route path="/wydarzenia/:eventId" element={<EventDetail />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
