import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import HistoryPage from "@/pages/History";
import { DarkModeProvider } from "@/contexts/DarkModeContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/history" component={HistoryPage}/>
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </DarkModeProvider>
    </QueryClientProvider>
  );
}

export default App;
