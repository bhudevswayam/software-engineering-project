import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Star, MapPin, Clock, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const featuredBusinesses = [
  {
    id: 1,
    name: "CleanPro Services",
    category: "Home Cleaning",
    rating: 4.9,
    reviewCount: 247,
    location: "Downtown Area",
    image: "https://images.unsplash.com/photo-1581578949510-fa7315c4c350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGNsZWFuaW5nJTIwc2VydmljZXxlbnwxfHx8fDE3NTc2MDI2NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "Starting at $49",
    responseTime: "2 hrs",
    verified: true,
    specialties: ["Deep Cleaning", "Regular Maintenance", "Move-in/out"]
  },
  {
    id: 2,
    name: "Legal Advisors LLC",
    category: "Legal Services",
    rating: 4.8,
    reviewCount: 156,
    location: "Business District",
    image: "https://images.unsplash.com/photo-1598139384902-5a8217874645?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWdhbCUyMGNvbnN1bHRhdGlvbnxlbnwxfHx8fDE3NTc2MjY2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "Starting at $150",
    responseTime: "4 hrs",
    verified: true,
    specialties: ["Corporate Law", "Real Estate", "Family Law"]
  },
  {
    id: 3,
    name: "TaxMaster Accounting",
    category: "Accounting",
    rating: 4.7,
    reviewCount: 89,
    location: "Midtown",
    image: "https://images.unsplash.com/photo-1563212034-a3c52118cce2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2NvdW50aW5nJTIwZmluYW5jZXxlbnwxfHx8fDE3NTc2MjY2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "Starting at $75",
    responseTime: "6 hrs",
    verified: true,
    specialties: ["Tax Filing", "Bookkeeping", "Financial Planning"]
  }
];

export function FeaturedBusinesses() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-4">Featured Service Providers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Top-rated professionals ready to help you with quality services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBusinesses.map((business) => (
            <Card key={business.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <ImageWithFallback 
                  src={business.image}
                  alt={business.name}
                  className="w-full h-full object-cover"
                />
                {business.verified && (
                  <div className="absolute top-4 right-4 bg-white rounded-full p-1">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                )}
                <Badge className="absolute top-4 left-4 bg-white text-gray-900">
                  {business.category}
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{business.name}</h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>{business.rating}</span>
                        <span>({business.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1 text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>{business.location}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>Responds in {business.responseTime}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Specialties:</p>
                    <div className="flex flex-wrap gap-1">
                      {business.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="font-medium">{business.price}</span>
                    <Button size="sm">Book Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Service Providers
          </Button>
        </div>
      </div>
    </section>
  );
}