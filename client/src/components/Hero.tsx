import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, Star, Users, Shield } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl leading-tight">
                Find trusted professionals for all your 
                <span className="text-primary"> service needs</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-md">
                Connect with verified service providers for home services, legal advice, 
                accounting, and more. Book instantly or get quotes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="What service do you need?" 
                  className="pl-10"
                />
              </div>
              <Button size="lg" className="whitespace-nowrap">
                Search Services
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-sm">10,000+ Service Providers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-sm">4.8 Average Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-sm">Verified & Insured</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1738817628102-0b420c17dac3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzZXJ2aWNlcyUyMGJ1c2luZXNzfGVufDF8fHx8MTc1NzU4MDY4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Professional services"
                className="w-full h-[400px] object-cover"
              />
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4 max-w-[200px]">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600">✓</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Service Booked</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 max-w-[200px]">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">5 Star Review</p>
                  <p className="text-xs text-gray-500">"Excellent service!"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}