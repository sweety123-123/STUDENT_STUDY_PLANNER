
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  LayoutGrid, 
  ListTodo, 
  BookOpen, 
  ChevronLeft, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutGrid className="h-5 w-5" /> },
    { name: 'Calendar', path: '/calendar', icon: <Calendar className="h-5 w-5" /> },
    { name: 'Tasks', path: '/tasks', icon: <ListTodo className="h-5 w-5" /> },
    { name: 'Subjects', path: '/subjects', icon: <BookOpen className="h-5 w-5" /> },
    { name: 'Settings', path: '/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-8 pt-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="rounded-md bg-primary/10 p-1.5">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-xl font-semibold tracking-tight">StudyPlan</h1>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="md:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="space-y-1 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="mt-auto">
            <div className="glass-card p-4 text-center">
              <p className="text-xs text-muted-foreground mb-2">Need help?</p>
              <Button variant="outline" size="sm" className="w-full">
                View Tutorial
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-border bg-background/70 backdrop-blur-sm sticky top-0 z-30 flex items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden mr-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1 flex justify-between items-center">
            <h1 className="text-xl font-semibold">
              {navItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
            </h1>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Welcome back,</span>
                <span className="font-medium">Student</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                S
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="mx-auto max-w-7xl animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
