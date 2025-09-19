import { Button } from "./ui/button";
import { Search, Menu, MapPin, User, Calendar, Building, LogOut } from "lucide-react";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { useAuth } from "../context/AuthContext"; // 👈 use context for auth
import { useNavigate, useLocation } from "react-router-dom";

export function Header({ currentPage, onNavigate }) {
  const { user, logoutUser } = useAuth(); // 👈 get user + logout from context
  const navigate = useNavigate();
  const location = useLocation();
  // Function to get user initials
  const getUserInitials = (name = "") => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  };
  const isHome = location.pathname === "/";

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground">S</span>
          </div>
          <span className="text-xl font-medium">ServiceHub</span>
        </div>

        {/* Location input only on home */}
        {isHome && (
          <div className="hidden md:flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2 min-w-[300px]">
            <MapPin className="h-4 w-4 text-gray-500" />
            <Input
              placeholder="Enter location"
              className="border-0 bg-transparent text-sm placeholder:text-gray-500 focus-visible:ring-0"
            />
          </div>
        )}

        {/* Right nav */}
        <div className="flex items-center space-x-4">
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => navigate("/")}
              className={`hover:text-primary transition-colors ${isHome ? "text-primary" : ""}`}
            >
              Home
            </button>

            {user && (
              <>
                <button
                  onClick={() => navigate("/bookings")}
                  className={`hover:text-primary transition-colors flex items-center space-x-1 ${
                    location.pathname === "/bookings" ? "text-primary" : ""
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  <span>My Bookings</span>
                </button>

                {user.role == 'business' && (
                  <button
                    onClick={() => navigate("/business")}
                    className={`hover:text-primary transition-colors flex items-center space-x-1 ${
                      location.pathname === "/business" ? "text-primary" : ""
                    }`}
                  >
                    <Building className="h-4 w-4" />
                    <span>Manage Business</span>
                  </button>
                )}
              </>
            )}
          </div>

          {/* Auth buttons / User dropdown */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  {getUserInitials(user.name)}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <p className="font-medium p-3">{user.name}</p>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    logoutUser();
                    navigate("/login");
                  }}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border border-primary" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/register")} className='border border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors'>Sign Up</Button>
              <Button onClick={() => navigate("/register-business")}>Register as Business</Button>
            </div>
          )}

          {/* Mobile menu */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}

