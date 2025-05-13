
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CashFlowPage from "./pages/CashFlowPage";
import ProfitLossPage from "./pages/ProfitLossPage";
import BalancePage from "./pages/BalancePage";
import AssistantPage from "./pages/AssistantPage";
import SettingsPage from "./pages/SettingsPage";
import UnitEconomicsPage from "./pages/UnitEconomicsPage";
import ForecastsPage from "./pages/ForecastsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cash-flow" element={<CashFlowPage />} />
          <Route path="/profit-loss" element={<ProfitLossPage />} />
          <Route path="/balance" element={<BalancePage />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="/unit-economics" element={<UnitEconomicsPage />} />
          <Route path="/forecasts" element={<ForecastsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
