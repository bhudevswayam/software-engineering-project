import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Building, Plus, Edit, Trash2, MapPin, Phone, Mail, Star, Clock, DollarSign } from "lucide-react";

interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  location: string;
  phone: string;
  email: string;
  rating: number;
  priceRange: string;
  hours: string;
  status: "active" | "inactive";
  services: string[];
}

const mockBusinesses: Business[] = [
  {
    id: "1",
    name: "CleanPro Services",
    category: "Home Cleaning",
    description: "Professional home cleaning services with eco-friendly products. We provide deep cleaning, regular maintenance, and specialized services.",
    location: "New York, NY",
    phone: "+1 (555) 123-4567",
    email: "contact@cleanpro.com",
    rating: 4.8,
    priceRange: "$50-150",
    hours: "Mon-Sat: 8AM-6PM",
    status: "active",
    services: ["Deep Cleaning", "Regular Cleaning", "Move-in/Move-out", "Office Cleaning"]
  },
  {
    id: "2",
    name: "QuickFix Plumbing",
    category: "Plumbing",
    description: "Emergency and scheduled plumbing services. Licensed and insured professionals available 24/7.",
    location: "Brooklyn, NY",
    phone: "+1 (555) 987-6543",
    email: "info@quickfixplumbing.com",
    rating: 4.6,
    priceRange: "$80-200",
    hours: "24/7 Emergency Service",
    status: "active",
    services: ["Emergency Repairs", "Installation", "Maintenance", "Drain Cleaning"]
  }
];

const categories = [
  "Home Cleaning", "Plumbing", "Legal Services", "Accounting", "Beauty & Wellness", 
  "Home Repair", "Tutoring", "Pet Care", "Catering", "Photography"
];

export function BusinessProfile() {
  const [businesses, setBusinesses] = useState<Business[]>(mockBusinesses);
  const [isAddingBusiness, setIsAddingBusiness] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState<Business | null>(null);
  const [newBusiness, setNewBusiness] = useState<Partial<Business>>({
    name: "",
    category: "",
    description: "",
    location: "",
    phone: "",
    email: "",
    priceRange: "",
    hours: "",
    services: []
  });

  const handleAddBusiness = () => {
    if (newBusiness.name && newBusiness.category) {
      const business: Business = {
        id: Date.now().toString(),
        name: newBusiness.name || "",
        category: newBusiness.category || "",
        description: newBusiness.description || "",
        location: newBusiness.location || "",
        phone: newBusiness.phone || "",
        email: newBusiness.email || "",
        rating: 0,
        priceRange: newBusiness.priceRange || "",
        hours: newBusiness.hours || "",
        status: "active",
        services: newBusiness.services || []
      };
      setBusinesses([...businesses, business]);
      setNewBusiness({
        name: "",
        category: "",
        description: "",
        location: "",
        phone: "",
        email: "",
        priceRange: "",
        hours: "",
        services: []
      });
      setIsAddingBusiness(false);
    }
  };

  const handleEditBusiness = (business: Business) => {
    setEditingBusiness(business);
    setNewBusiness(business);
    setIsAddingBusiness(true);
  };

  const handleUpdateBusiness = () => {
    if (editingBusiness && newBusiness.name && newBusiness.category) {
      const updatedBusiness: Business = {
        ...editingBusiness,
        name: newBusiness.name || "",
        category: newBusiness.category || "",
        description: newBusiness.description || "",
        location: newBusiness.location || "",
        phone: newBusiness.phone || "",
        email: newBusiness.email || "",
        priceRange: newBusiness.priceRange || "",
        hours: newBusiness.hours || "",
        services: newBusiness.services || []
      };
      setBusinesses(businesses.map(b => b.id === editingBusiness.id ? updatedBusiness : b));
      setEditingBusiness(null);
      setNewBusiness({
        name: "",
        category: "",
        description: "",
        location: "",
        phone: "",
        email: "",
        priceRange: "",
        hours: "",
        services: []
      });
      setIsAddingBusiness(false);
    }
  };

  const handleDeleteBusiness = (id: string) => {
    setBusinesses(businesses.filter(b => b.id !== id));
  };

  const toggleStatus = (id: string) => {
    setBusinesses(businesses.map(b => 
      b.id === id ? { ...b, status: b.status === "active" ? "inactive" : "active" } : b
    ));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl mb-2">Manage Business</h1>
            <p className="text-muted-foreground">Add, edit, and manage your business listings</p>
          </div>
          <Dialog open={isAddingBusiness} onOpenChange={setIsAddingBusiness}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Business
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingBusiness ? "Edit Business" : "Add New Business"}
                </DialogTitle>
                <DialogDescription>
                  {editingBusiness ? "Update your business information" : "Create a new business listing"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-name">Business Name</Label>
                    <Input
                      id="business-name"
                      value={newBusiness.name || ""}
                      onChange={(e) => setNewBusiness({ ...newBusiness, name: e.target.value })}
                      placeholder="Enter business name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newBusiness.category || ""}
                      onValueChange={(value) => setNewBusiness({ ...newBusiness, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newBusiness.description || ""}
                    onChange={(e) => setNewBusiness({ ...newBusiness, description: e.target.value })}
                    placeholder="Describe your business and services"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newBusiness.location || ""}
                      onChange={(e) => setNewBusiness({ ...newBusiness, location: e.target.value })}
                      placeholder="City, State"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newBusiness.phone || ""}
                      onChange={(e) => setNewBusiness({ ...newBusiness, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newBusiness.email || ""}
                      onChange={(e) => setNewBusiness({ ...newBusiness, email: e.target.value })}
                      placeholder="contact@business.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price-range">Price Range</Label>
                    <Input
                      id="price-range"
                      value={newBusiness.priceRange || ""}
                      onChange={(e) => setNewBusiness({ ...newBusiness, priceRange: e.target.value })}
                      placeholder="$50-150"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hours">Business Hours</Label>
                  <Input
                    id="hours"
                    value={newBusiness.hours || ""}
                    onChange={(e) => setNewBusiness({ ...newBusiness, hours: e.target.value })}
                    placeholder="Mon-Fri: 9AM-5PM"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  onClick={editingBusiness ? handleUpdateBusiness : handleAddBusiness}
                  disabled={!newBusiness.name || !newBusiness.category}
                >
                  {editingBusiness ? "Update Business" : "Add Business"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {businesses.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No businesses yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first business listing to start receiving bookings
              </p>
              <Button onClick={() => setIsAddingBusiness(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Business
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {businesses.map((business) => (
              <Card key={business.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Building className="h-6 w-6 text-primary" />
                      <div>
                        <CardTitle>{business.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary">{business.category}</Badge>
                          <Badge className={business.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                            {business.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditBusiness(business)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleStatus(business.id)}
                      >
                        {business.status === "active" ? "Deactivate" : "Activate"}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteBusiness(business.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <p className="text-gray-600">{business.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{business.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span>{business.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span>{business.email}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {renderStars(business.rating)}
                        </div>
                        <span className="text-sm text-gray-600">
                          {business.rating > 0 ? `(${business.rating})` : "No ratings yet"}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <DollarSign className="h-4 w-4 text-gray-500" />
                          <span>{business.priceRange}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{business.hours}</span>
                        </div>
                      </div>
                      
                      {business.services.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-2">Services:</p>
                          <div className="flex flex-wrap gap-1">
                            {business.services.map((service, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}