
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/data";
import { ChevronRight, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={cn(
        "min-h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <Link to="/dashboard" className="text-white font-bold text-xl">
            TatamePro
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-white hover:bg-sidebar-accent hover:text-white ml-auto"
        >
          {collapsed ? <Menu size={20} /> : <ChevronRight size={20} />}
        </Button>
      </div>
      
      <div className="flex-1 py-4 overflow-y-auto scrollbar-none">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.route}
              to={item.route}
              className={cn(
                "flex items-center py-2 px-3 rounded-md transition-colors",
                location.pathname === item.route
                  ? "bg-sidebar-accent text-white font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                collapsed ? "justify-center" : "justify-start"
              )}
            >
              <item.icon size={20} />
              {!collapsed && <span className="ml-3">{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
            A
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-white text-sm font-medium">Admin</p>
              <p className="text-white/70 text-xs">TatamePro</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
