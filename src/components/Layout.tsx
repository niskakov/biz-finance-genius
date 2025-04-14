
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Home,
  Wallet,
  FileSpreadsheet,
  MessageSquare,
  Settings,
  Menu,
  X,
  Calculator,
  TrendingUp
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = React.useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  React.useEffect(() => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    } else if (!isMobile && !sidebarOpen) {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const navigationItems = [
    { name: "Обзор", icon: Home, path: "/" },
    { name: "Движение денежных средств", icon: Wallet, path: "/cash-flow" },
    { name: "Прибыль и убытки", icon: BarChart3, path: "/profit-loss" },
    { name: "Баланс", icon: FileSpreadsheet, path: "/balance" },
    { name: "Юнит-экономика", icon: Calculator, path: "/unit-economics" },
    { name: "Прогнозы", icon: TrendingUp, path: "/forecasts" },
    { name: "Финансовый ассистент", icon: MessageSquare, path: "/assistant" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Mobile Header */}
      <header className="md:hidden bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold ml-3">Финансовый аналитик</h1>
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={cn(
          "bg-white border-r fixed inset-0 z-30 transition-transform duration-300 md:relative md:translate-x-0 md:w-64",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-5 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-primary rounded-lg p-2 text-white">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h1 className="text-lg font-bold">Финансовый аналитик</h1>
          </div>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <X className="h-6 w-6" />
            </Button>
          )}
        </div>

        <nav className="p-5">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>
          
          <div className="pt-8">
            <Link to="/settings">
              <Button
                variant={location.pathname === "/settings" ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  location.pathname === "/settings"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
              >
                <Settings className="mr-2 h-5 w-5" />
                Настройки
              </Button>
            </Link>
          </div>
        </nav>

        <div className="absolute bottom-5 p-5 w-full">
          <Card className="p-4 bg-accent text-accent-foreground">
            <p className="text-sm font-medium">MVP версия</p>
            <p className="text-xs mt-1">Бета-тестирование</p>
          </Card>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <main className="p-5 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
