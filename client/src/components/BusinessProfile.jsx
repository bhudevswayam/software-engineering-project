import { useEffect, useState } from "react";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "@/api/service"; // ✅ FIXED import path
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Building,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Star,
  Clock,
  DollarSign,
} from "lucide-react";

const categories = [
  "Home Cleaning",
  "Plumbing",
  "Legal Services",
  "Accounting",
  "Beauty & Wellness",
  "Home Repair",
  "Tutoring",
  "Pet Care",
  "Catering",
  "Photography",
];

export function BusinessProfile() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddingBusiness, setIsAddingBusiness] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState(null);
  const [newBusiness, setNewBusiness] = useState({
    name: "",
    category: "",
    description: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    email: "",
    priceRange: "",
    businessHours: "",
  });

  // ✅ Fetch all businesses on mount
  useEffect(() => {
    (async () => {
      try {
        const data = await getServices();
        setBusinesses(data);
      } catch (err) {
        console.error("Failed to load businesses:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ✅ Add or update
  const handleSaveBusiness = async () => {
    try {
      const payload = {
        ...newBusiness,
        business: JSON.parse(localStorage.getItem("user"))?.id || "", 
        tenantId: localStorage.getItem("x-tenant-id"),
      };

      if (editingBusiness) {
        const updated = await updateService(editingBusiness._id, payload);
        setBusinesses((prev) =>
          prev.map((b) => (b._id === editingBusiness._id ? updated : b))
        );
      } else {
        const created = await createService(payload);
        setBusinesses((prev) => [...prev, created]);
      }

      setIsAddingBusiness(false);
      setEditingBusiness(null);
      setNewBusiness({
        name: "",
        category: "",
        description: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zipCode: "",
        phoneNumber: "",
        email: "",
        priceRange: "",
        businessHours: "",
      });
    } catch (err) {
      console.error("Failed to save business:", err);
    }
  };

  // ✅ Delete
  const handleDeleteBusiness = async (id) => {
    if (!window.confirm("Are you sure you want to delete this business?")) return;
    try {
      await deleteService(id);
      setBusinesses((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating || 0)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));

  if (loading) {
    return (
      <div className="text-center py-20">
        <p>Loading businesses...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl mb-2">Manage Business</h1>
            <p className="text-muted-foreground">
              Add, edit, and manage your business listings
            </p>
          </div>

          {/* Add Business Dialog */}
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
                  {editingBusiness
                    ? "Update your business information"
                    : "Create a new business listing"}
                </DialogDescription>
              </DialogHeader>

              {/* ✅ Form Fields */}
              <div className="grid gap-4 py-4">
                {[
                  { id: "name", label: "Business Name *" },
                  { id: "category", label: "Category", select: true },
                  { id: "description", label: "Description", textarea: true },
                  { id: "addressLine1", label: "Address Line 1" },
                  { id: "addressLine2", label: "Address Line 2" },
                  { id: "city", label: "City" },
                  { id: "state", label: "State" },
                  { id: "zipCode", label: "Zip Code", type: "number" },
                  { id: "phoneNumber", label: "Phone Number", type: "number" },
                  { id: "email", label: "Email", type: "email" },
                  { id: "priceRange", label: "Price", type: "number" },
                  { id: "businessHours", label: "Business Hours" },
                ].map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.id}>{field.label}</Label>
                    {field.select ? (
                      <Select
                        value={newBusiness.category || ""}
                        onValueChange={(value) =>
                          setNewBusiness({ ...newBusiness, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : field.textarea ? (
                      <Textarea
                        id={field.id}
                        value={newBusiness[field.id] || ""}
                        onChange={(e) =>
                          setNewBusiness({
                            ...newBusiness,
                            [field.id]: e.target.value,
                          })
                        }
                        placeholder="Describe your business"
                        rows={3}
                      />
                    ) : (
                      <Input
                        id={field.id}
                        type={field.type || "text"}
                        value={newBusiness[field.id] || ""}
                        onChange={(e) =>
                          setNewBusiness({
                            ...newBusiness,
                            [field.id]: e.target.value,
                          })
                        }
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <DialogFooter>
                <Button onClick={handleSaveBusiness}>
                  {editingBusiness ? "Update Business" : "Create Business"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* ✅ Business List */}
        {businesses.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
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
            {businesses.map((b) => (
              <Card key={b._id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Building className="h-6 w-6 text-primary" />
                      <div>
                        <CardTitle>{b.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary">{b.category}</Badge>
                          <Badge
                            className={
                              b.active
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {b.active ? "active" : "inactive"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingBusiness(b);
                          setNewBusiness(b);
                          setIsAddingBusiness(true);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteBusiness(b._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <p className="text-gray-600">{b.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>
                            {b.addressLine1}, {b.city}, {b.state}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span>{b.phoneNumber}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span>{b.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        {renderStars(4.5)}
                        <span className="text-sm text-gray-600">(4.5)</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-gray-500" />
                          <span>{b.priceRange}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{b.businessHours}</span>
                        </div>
                      </div>
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
