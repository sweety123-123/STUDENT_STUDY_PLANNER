
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Calendar from "./components/calendar/Calendar";
import TaskList from "./components/tasks/TaskList";
import SubjectList from "./components/subjects/SubjectList";
import Layout from "./components/layout/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route 
            path="/calendar" 
            element={
              <Layout>
                <Calendar />
              </Layout>
            } 
          />
          <Route 
            path="/tasks" 
            element={
              <Layout>
                <TaskList />
              </Layout>
            } 
          />
          <Route 
            path="/subjects" 
            element={
              <Layout>
                <SubjectList />
              </Layout>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <Layout>
                <div className="min-h-[60vh] flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Settings</h1>
                    <p className="text-muted-foreground">Settings page is under construction</p>
                  </div>
                </div>
              </Layout>
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
