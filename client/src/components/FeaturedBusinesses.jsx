import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Star, MapPin, Clock, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getAllServices } from "../api/service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function FeaturedBusinesses() {
  const [featuredBusinesses, setFeaturedBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleBookNow = (id) => {
    navigate(`/service-detail/${id}`); // ✅ Navigate with ID in URL
  };

  useEffect(() => {
  const fetchData = async () => {
    try {
      const services = await getAllServices(); // Fetch services from API

      const formatted = services.map((service) => {
        let imageUrl = "https://via.placeholder.com/400x300?text=No+Image";

        // ✅ Convert Buffer → Base64 → Data URL
        if (service.images && service.images.length > 0 && service.images[0].data?.data) {
          const bufferData = service.images[0].data.data; // the raw byte array
          const base64String = btoa(
            new Uint8Array(bufferData)
              .reduce((data, byte) => data + String.fromCharCode(byte), "")
          );
          imageUrl = `data:${service.images[0].contentType};base64,${base64String}`;
        }

        return {
          id: service._id,
          name: service.name,
          category: service.category || "General",
          location:
            service.city && service.state
              ? `${service.city}, ${service.state}`
              : "N/A",
          price: service.priceRange
            ? `$${service.priceRange}`
            : "Pricing not available",
          image: imageUrl, // ✅ use converted URL
          rating: service.rating || 4.5,
          reviewCount: service.reviewCount || 10,
          responseTime: service.responseTime || "1 hour",
          verified: service.business ? true : false,
          specialties: service.specialties || [],
        };
      });

      setFeaturedBusinesses(formatted);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);


  if (loading) return <p>Loading...</p>;

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
                    <Button size="sm" onClick={() => handleBookNow(business.id)}>
                      Book Now
                    </Button>
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