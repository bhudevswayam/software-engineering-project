import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  Star, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Phone, 
  Mail, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Shield,
  Award,
  Users,
  DollarSign
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getRelatedServices } from "../api/service";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { createBooking } from "../api/bookings"; 

// Mock service data - in a real app, this would come from props or API
const serviceDataMock = {
  id: 1,
  name: "CleanPro Services",
  category: "Home Cleaning",
  rating: 4.9,
  reviewCount: 247,
  location: "Downtown Area",
  price: "Starting at $49",
  responseTime: "2 hrs",
  verified: true,
  description: "Professional home cleaning service with over 10 years of experience. We provide thorough, reliable cleaning services for homes and apartments of all sizes. Our trained staff uses eco-friendly products and modern equipment to ensure your home is spotless.",
  images: [
    "https://images.unsplash.com/photo-1581578949510-fa7315c4c350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGNsZWFuaW5nJTIwc2VydmljZXxlbnwxfHx8fDE3NTc2MDI2NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjbGVhbmluZyUyMHNlcnZpY2V8ZW58MXx8fHwxNzU3NjAyNjQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1563453392212-326f5e854473?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxjbGVhbmluZyUyMHNlcnZpY2V8ZW58MXx8fHwxNzU3NjAyNjQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1585421514738-01798e348b17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxjbGVhbmluZyUyMHNlcnZpY2V8ZW58MXx8fHwxNzU3NjAyNjQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  ],
  specialties: ["Deep Cleaning", "Regular Maintenance", "Move-in/out", "Post-Construction"],
  pricing: [
    { name: "Basic Cleaning", price: "$49", description: "Standard cleaning for small apartments (up to 500 sq ft)" },
    { name: "Standard Cleaning", price: "$89", description: "Comprehensive cleaning for medium homes (500-1000 sq ft)" },
    { name: "Deep Cleaning", price: "$149", description: "Thorough cleaning for large homes (1000+ sq ft)" },
    { name: "Move-in/out", price: "$199", description: "Complete cleaning service for moving situations" },
  ],
  features: [
    "Eco-friendly cleaning products",
    "Fully insured and bonded",
    "Background-checked staff",
    "Flexible scheduling",
    "100% satisfaction guarantee",
    "Same-day service available"
  ],
  provider: {
    name: "Sarah Johnson",
    title: "Owner & Lead Cleaner",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbnxlbnwxfHx8fDE3NTc2MDI2NDJ8MA&ixlib=rb-4.1.0&q=80&w=400",
    phone: "(555) 123-4567",
    email: "sarah@cleanproservices.com",
    bio: "With over 10 years in the cleaning industry, I've built a team of dedicated professionals who take pride in their work. We treat every home like it's our own.",
    yearsExperience: 10,
    completedJobs: 2450
  },
  reviews: [
    {
      id: 1,
      author: "Michael Chen",
      rating: 5,
      date: "2 weeks ago",
      comment: "Absolutely excellent service! The team was professional, thorough, and friendly. My house has never looked better. Highly recommend!",
      avatar: "MC"
    },
    {
      id: 2,
      author: "Emma Rodriguez",
      rating: 5,
      date: "1 month ago",
      comment: "Sarah and her team did an amazing job with our deep cleaning. They paid attention to every detail and were very respectful of our home.",
      avatar: "ER"
    },
    {
      id: 3,
      author: "David Thompson",
      rating: 4,
      date: "1 month ago",
      comment: "Great service overall. Very professional and efficient. The only minor issue was they arrived 15 minutes late, but they made up for it with excellent work.",
      avatar: "DT"
    },
    {
      id: 4,
      author: "Lisa Park",
      rating: 5,
      date: "2 months ago",
      comment: "We've been using CleanPro for monthly maintenance for 6 months now. Consistently excellent service every time. Worth every penny!",
      avatar: "LP"
    }
  ],
  availability: "Monday - Saturday, 8:00 AM - 6:00 PM",
  serviceArea: "Downtown, Midtown, and surrounding areas within 15 miles"
};

const ServiceDetail = ({onBookNow, onBack}) => {
  const { id } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [relatedServices, setRelatedServices] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const services = await getRelatedServices(id);
        console.log("Fetched services:", services);

        const formattedServices = services.services.map((service) => {
          const decodedImages =
            service.images && service.images.length > 0
              ? service.images.map((img) => {
                  try {
                    const base64String = btoa(
                      new Uint8Array(img.data.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ""
                      )
                    );
                    return `data:${img.contentType};base64,${base64String}`;
                  } catch (err) {
                    console.error("Error decoding image:", err);
                    return null;
                  }
                }).filter(Boolean)
              : serviceDataMock.images;

          return {
            id: service._id || serviceDataMock.id,
            name: service.name || serviceDataMock.name,
            category: service.category || serviceDataMock.category,
            rating: service.rating ?? serviceDataMock.rating,
            reviewCount: service.reviewCount ?? serviceDataMock.reviewCount,
            location:
              service.city && service.state
                ? `${service.city}, ${service.state}`
                : serviceDataMock.location,
            price: service.priceRange
              ? `Starting at ${service.priceRange}`
              : serviceDataMock.price,
            responseTime: service.responseTime || serviceDataMock.responseTime,
            verified: service.verified ?? serviceDataMock.verified,
            description: service.description || serviceDataMock.description,
            images: decodedImages,
            specialties:
              service.specialties && service.specialties.length > 0
                ? service.specialties
                : serviceDataMock.specialties,
            features:
              service.features && service.features.length > 0
                ? service.features
                : serviceDataMock.features,
            availability:
              service.businessHours ||
              service.availability ||
              serviceDataMock.availability,
            serviceArea:
              service.serviceArea ||
              (service.city && service.state
                ? `${service.city}, ${service.state} and surrounding areas`
                : serviceDataMock.serviceArea),
            address:
              service.addressLine1 && service.city && service.state
                ? `${service.addressLine1}${
                    service.addressLine2 ? ", " + service.addressLine2 : ""
                  }, ${service.city}, ${service.state} ${service.zipCode || ""}`
                : null,
            phoneNumber: service.phoneNumber || null,
            email: service.email || null,
            tenantId: service.tenantId || null,
            priceRange: service.priceRange || null,
            provider: service.business
              ? {
                  name:
                    service.business.name || serviceDataMock.provider.name,
                  title:
                    service.business.title || serviceDataMock.provider.title,
                  avatar:
                    service.business.avatar || serviceDataMock.provider.avatar,
                  phone:
                    service.phoneNumber ||
                    service.business.phone ||
                    serviceDataMock.provider.phone,
                  email:
                    service.email ||
                    service.business.email ||
                    serviceDataMock.provider.email,
                  bio:
                    service.business.bio || serviceDataMock.provider.bio,
                  yearsExperience:
                    service.business.yearsExperience ??
                    serviceDataMock.provider.yearsExperience,
                  completedJobs:
                    service.business.completedJobs ??
                    serviceDataMock.provider.completedJobs,
                }
              : serviceDataMock.provider,
            reviews:
              service.reviews && service.reviews.length > 0
                ? service.reviews
                : serviceDataMock.reviews,
          };
        });

        setRelatedServices(formattedServices);

        console.log("Formatted services:", formattedServices);

        let selectedService;
        if (id) {
          selectedService = formattedServices.find((s) => s.id === id);
        }
        if (!selectedService) {
          selectedService =
            formattedServices.length > 0
              ? formattedServices[0]
              : serviceDataMock;
        }

        let pricingOptions = [];
        if (selectedService.tenantId) {
          pricingOptions = formattedServices
            .filter((s) => s.tenantId === selectedService.tenantId)
            .map((s) => ({
              name: s.name,
              price: `${s.priceRange}`,
              description: s.description,
              serviceId: s.id,
            }));
        }

        if (pricingOptions.length > 0) {
          selectedService.pricing = pricingOptions;
        } else if (
          !selectedService.pricing ||
          selectedService.pricing.length === 0
        ) {
          selectedService.pricing = serviceDataMock.pricing;
        }

        setServiceData(selectedService);
        console.log("Selected service:", selectedService);
        console.log("Pricing options:", selectedService.pricing);
      } catch (error) {
        console.error("Error fetching services:", error);
        setServiceData(serviceDataMock);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleBookNow = () => {
    setOpen(true);
    console.log(open);
  };

  const handleConfirmBooking = async () => {
    if (!selectedServiceId || !startTime) {
      alert("Please select service and time");
      return;
    }

    try {
      console.log(selectedServiceId);
      
      const response = await createBooking({
        serviceId: selectedServiceId,
        start: new Date(startTime).toISOString(),
      });

      console.log("Booking Successful:", response);
      alert("Booking Confirmed!");
      setOpen(false);
    } catch (error) {
      console.error("Booking Failed:", error);
      alert("Failed to book. Please try again.");
    }
  };

  const nextImage = () => {
    if (serviceData && serviceData.images) {
      setCurrentImageIndex((prev) => 
        prev === serviceData.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const previousImage = () => {
    if (serviceData && serviceData.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? serviceData.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) return <p className="text-center py-20">Loading service details...</p>;
  if (!serviceData) return <p className="text-center py-20">Service not found.</p>;

  return (
    <> 
      {/* Enhanced Booking Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="sm:max-w-lg p-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
    {/* Header */}
    <div className="px-6 pt-6 pb-4 border-b border-gray-200 bg-white">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-gray-800 mb-1">
          Book Your Service
        </DialogTitle>
        <p className="text-sm text-gray-600">
          Select your preferred service and schedule your appointment.
        </p>
      </DialogHeader>
    </div>

    {/* Content */}
    <div className="px-6 py-6 space-y-6 bg-white">
      {/* Select Service */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-semibold text-gray-700">
          <CheckCircle className="w-4 h-4 mr-2 text-gray-600" />
          Select Service
        </label>
        <div className="relative">
          <select
            className="
              w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-700
              focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10
              hover:border-gray-400 transition-all duration-200
              appearance-none cursor-pointer shadow-sm
            "
            value={selectedServiceId}
            onChange={(e) => setSelectedServiceId(e.target.value)}
          >
            <option value="" className="text-gray-400">
              Choose your service...
            </option>
            {relatedServices?.map((srv) => (
              <option key={srv.id} value={srv.id}>
                {srv.name} — ${srv.priceRange}
              </option>
            ))}
          </select>

          {/* custom dropdown arrow */}
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-gray-400 transition-transform duration-200 group-hover:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Optional dropdown hint */}
        <p className="text-xs text-gray-500 mt-1">
          Choose a service to view available times.
        </p>
      </div>

      {/* Date & Time Selection */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-semibold text-gray-700">
          <Clock className="w-4 h-4 mr-2 text-gray-600" />
          Appointment Date & Time
        </label>
        <input
          type="datetime-local"
          className="
            w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700
            focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10
            hover:border-gray-400 transition-all duration-200
            shadow-sm
          "
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>

      {/* Confirmation Message */}
      {selectedServiceId && startTime && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-start space-x-3">
            <Calendar className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-gray-800 mb-1">Ready to book!</p>
              <p className="text-gray-600">
                Review your selection and confirm to complete your booking.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>

    {/* Footer */}
    <DialogFooter className="border-t border-gray-200 bg-gray-50 px-6 py-4 flex justify-end space-x-3">
      <Button
        variant="outline"
        onClick={() => setOpen(false)}
        className="px-5 py-2.5 rounded-xl font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
      >
        Cancel
      </Button>
      <Button
        onClick={handleConfirmBooking}
        disabled={!selectedServiceId || !startTime}
        className="px-5 py-2.5 rounded-xl font-medium text-white bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all duration-200"
      >
        Confirm Booking
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>


      {/* Main Service Detail View */}
      {!open && (
        <div className="min-h-screen bg-gray-50">
          {/* Breadcrumb */}
          <div className="bg-white border-b">
            <div className="container mx-auto px-4 py-4">
              <button 
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="h-5 w-5 mr-1" />
                Back to Services
              </button>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Image Gallery */}
                <Card className="overflow-hidden">
                  <div className="relative">
                    <div className="aspect-[16/9] bg-gray-200">
                      {serviceData.images && serviceData.images.length > 0 && (
                        <ImageWithFallback
                          src={serviceData.images[currentImageIndex]}
                          alt={`${serviceData.name} - Image ${currentImageIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    
                    {/* Navigation Arrows */}
                    {serviceData.images && serviceData.images.length > 1 && (
                      <>
                        <button
                          onClick={previousImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    {serviceData.images && serviceData.images.length > 0 && (
                      <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {serviceData.images.length}
                      </div>
                    )}

                    {serviceData.verified && (
                      <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Scrollable Section */}
                  {serviceData.images && serviceData.images.length > 1 && (
                    <div className="p-4 bg-white border-t">
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {serviceData.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                              index === currentImageIndex 
                                ? "border-gray-900 ring-2 ring-gray-900/20" 
                                : "border-gray-200 hover:border-gray-400"
                            }`}
                          >
                            <ImageWithFallback
                              src={image}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>

                {/* Service Details */}
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h1 className="text-3xl mb-2">{serviceData.name}</h1>
                            <Badge className="mb-3">{serviceData.category}</Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="flex items-center space-x-1">
                            <Star className="h-5 w-5 text-yellow-500 fill-current" />
                            <span className="font-medium">{serviceData.rating}</span>
                            <span className="text-gray-500">({serviceData.reviewCount} reviews)</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{serviceData.location}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>Responds in {serviceData.responseTime}</span>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h2 className="text-xl mb-3">About This Service</h2>
                        <p className="text-gray-700 leading-relaxed">{serviceData.description}</p>
                      </div>

                      <Separator />

                      {serviceData.specialties && serviceData.specialties.length > 0 && (
                        <>
                          <div>
                            <h3 className="text-lg mb-3">Specialties</h3>
                            <div className="flex flex-wrap gap-2">
                              {serviceData.specialties.map((specialty, index) => (
                                <Badge key={index} variant="outline">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Separator />
                        </>
                      )}

                      {serviceData.features && serviceData.features.length > 0 && (
                        <>
                          <div>
                            <h3 className="text-lg mb-3">Key Features</h3>
                            <div className="grid md:grid-cols-2 gap-3">
                              {serviceData.features.map((feature, index) => (
                                <div key={index} className="flex items-start space-x-2">
                                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-gray-700">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <Separator />
                        </>
                      )}

                      {serviceData.pricing && serviceData.pricing.length > 0 && (
                        <>
                          <div>
                            <h3 className="text-lg mb-3">Pricing Options</h3>
                            <div className="space-y-3">
                              {serviceData.pricing.map((option, index) => (
                                <div key={index} className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <DollarSign className="h-4 w-4 text-gray-500" />
                                      <span>{option.name}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 ml-6">{option.description}</p>
                                    <p className="text-sm text-gray-600 ml-6">{option.availability}</p>
                                  </div>
                                  <span className="text-lg ml-4">${option.price}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <Separator />
                        </>
                      )}

                      <div>
                        <h3 className="text-lg mb-3">Service Details</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          {serviceData.availability && (
                            <div className="space-y-2">
                              <div className="flex items-start space-x-2">
                                <Calendar className="h-4 w-4 text-gray-500 mt-0.5" />
                                <div>
                                  <p className="text-gray-500">Availability</p>
                                  <p className="text-gray-900">{serviceData.availability}</p>
                                </div>
                              </div>
                            </div>
                          )}
                          {serviceData.serviceArea && (
                            <div className="space-y-2">
                              <div className="flex items-start space-x-2">
                                <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                                <div>
                                  <p className="text-gray-500">Service Area</p>
                                  <p className="text-gray-900">{serviceData.serviceArea}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Reviews */}
                {serviceData.reviews && serviceData.reviews.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl mb-4">Customer Reviews</h3>
                      <div className="space-y-4">
                        {serviceData.reviews.map((review) => (
                          <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                            <div className="flex items-start space-x-3">
                              <Avatar>
                                <AvatarFallback>{review.avatar}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span>{review.author}</span>
                                  <span className="text-sm text-gray-500">{review.date}</span>
                                </div>
                                <div className="flex items-center space-x-1 mb-2">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating
                                          ? "text-yellow-500 fill-current"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-4 space-y-6">
                  {/* Booking Card */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="text-center py-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Starting at</p>
                          <p className="text-3xl">{serviceData.price}</p>
                        </div>

                        <Button 
                          onClick={handleBookNow}
                          className="w-full"
                          size="lg"
                        >
                          Book Now
                        </Button>

                        <div className="text-center text-sm text-gray-600">
                          <p>Free cancellation up to 24 hours before</p>
                        </div>

                        <Separator />

                        <div className="space-y-3">
                          <div className="flex items-center space-x-2 text-sm">
                            <Shield className="h-4 w-4 text-green-600" />
                            <span>Verified & Background Checked</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Award className="h-4 w-4 text-green-600" />
                            <span>Satisfaction Guaranteed</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Users className="h-4 w-4 text-green-600" />
                            <span>Trusted by 2,450+ Customers</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Provider Info */}
                  {serviceData.provider && (
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg mb-4">Service Provider</h3>
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={serviceData.provider.avatar} />
                              <AvatarFallback>
                                {serviceData.provider.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{serviceData.provider.name}</p>
                              <p className="text-sm text-gray-600">{serviceData.provider.title}</p>
                            </div>
                          </div>

                          {serviceData.provider.bio && (
                            <p className="text-sm text-gray-700">{serviceData.provider.bio}</p>
                          )}

                          <div className="grid grid-cols-2 gap-4 py-4 border-t border-b">
                            <div className="text-center">
                              <p className="text-2xl mb-1">{serviceData.provider.yearsExperience || 0}</p>
                              <p className="text-xs text-gray-600">Years Experience</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl mb-1">{(serviceData.provider.completedJobs || 0).toLocaleString()}</p>
                              <p className="text-xs text-gray-600">Jobs Completed</p>
                            </div>
                          </div>

                          <div className="space-y-2 text-sm">
                            {serviceData.provider.phone && (
                              <a 
                                href={`tel:${serviceData.provider.phone}`}
                                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
                              >
                                <Phone className="h-4 w-4" />
                                <span>{serviceData.provider.phone}</span>
                              </a>
                            )}
                            {serviceData.provider.email && (
                              <a 
                                href={`mailto:${serviceData.provider.email}`}
                                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
                              >
                                <Mail className="h-4 w-4" />
                                <span>{serviceData.provider.email}</span>
                              </a>
                            )}
                            {serviceData.address && (
                              <div className="flex items-start space-x-2 text-gray-700">
                                <MapPin className="h-4 w-4 mt-0.5" />
                                <span>{serviceData.address}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Trust & Safety */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg mb-4">Trust & Safety</h3>
                      <div className="space-y-3 text-sm text-gray-700">
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Identity verified</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Background check completed</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Licensed and insured</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Secure payment processing</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ServiceDetail;