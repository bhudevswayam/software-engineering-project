import { MapPin } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
            <span className="text-white">S</span>
          </div>
          <span className="tracking-tight">ServiceHub</span>
        </div>

        <div className="hidden md-center gap-2 text-gray-500 text-sm">
          <MapPin className="w-4 h-4" />
          <input
            type="text"
            placeholder="Enter location"
            className="border-none outline-none bg-transparent text-gray-600 placeholder-gray-400"
          />
        </div>

        <nav className="flex items-center gap-4">
          <button className="text-sm hover-gray-600 transition-colors">
            Home
          </button>
          <button className="text-sm hover-gray-600 transition-colors px-4 py-2 border border-gray-300 rounded-md">
            Login
          </button>
          <button className="text-sm hover-gray-600 transition-colors px-4 py-2 border border-gray-300 rounded-md">
            Sign Up
          </button>
          <button className="text-sm text-white bg-black px-4 py-2 rounded-md hover-gray-800 transition-colors">
            Register
          </button>
        </nav>
      </div>
    </header>
  );
}