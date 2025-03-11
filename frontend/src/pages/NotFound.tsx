
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center glass-card p-10 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-6">Oops! This page doesn't exist</p>
          <Button asChild>
            <a href="/">Return to Dashboard</a>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
