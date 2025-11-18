import { useEffect, useState } from "react";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "@/api/service";
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
  Image as ImageIcon,
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
  const [selectedImages, setSelectedImages] = useState([]); // 👈 holds selected files
  const [previewImages, setPreviewImages] = useState([]); // 👈 holds image preview URLs

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

  // ✅ Fetch all services on mount
  useEffect(() => {
    (async () => {
      try {
        const data = await getServices();
        setBusinesses(data);
      } catch (err) {
        console.error("Failed to load services:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ✅ Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);

    // generate preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // ✅ Create or update service
  const handleSaveBusiness = async () => {
    try {
      const formData = new FormData();

      Object.entries(newBusiness).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // append tenant and business IDs
      formData.append(
        "business",
        JSON.parse(localStorage.getItem("user"))?.id || ""
      );
      formData.append("tenantId", localStorage.getItem("x-tenant-id"));

      // append image files
      selectedImages.forEach((file) => {
        formData.append("images", file);
      });

      let result;
      if (editingBusiness) {
        result = await updateService(editingBusiness._id, formData, true); // ✅ pass formData flag
        setBusinesses((prev) =>
          prev.map((b) => (b._id === editingBusiness._id ? result : b))
        );
      } else {
        result = await createService(formData, true); // ✅ pass formData flag
        setBusinesses((prev) => [...prev, result]);
      }

      // reset form
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
      setSelectedImages([]);
      setPreviewImages([]);
    } catch (err) {
      console.error("Failed to save service:", err);
    }
  };

  // ✅ Delete service
  const handleDeleteBusiness = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
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
        <p>Loading services...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl mb-2">Manage Services</h1>
            <p className="text-muted-foreground">
              Add, edit, and manage your service listings
            </p>
          </div>

          {/* Add/Edit Dialog */}
          <Dialog open={isAddingBusiness} onOpenChange={setIsAddingBusiness}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingBusiness ? "Edit Service" : "Add New Service"}
                </DialogTitle>
                <DialogDescription>
                  {editingBusiness
                    ? "Update your service details"
                    : "Create a new service listing"}
                </DialogDescription>
              </DialogHeader>

              {/* ✅ Form Fields */}
              <div className="grid gap-4 py-4">
                {/* Image Upload Field */}
                <div className="space-y-2">
                  <Label>Service Images</Label>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {previewImages.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {previewImages.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`preview-${i}`}
                          className="w-20 h-20 object-cover rounded-md border"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Other Input Fields */}
                {[
                  { id: "name", label: "Service Name *" },
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
                        placeholder="Describe your service"
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
                  {editingBusiness ? "Update Service" : "Create Service"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* ✅ Display Services */}
        {businesses.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No services yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first service to start receiving bookings
              </p>
              <Button onClick={() => setIsAddingBusiness(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Service
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
                      {/* ✅ Display service images */}
                      {b.images && b.images.length > 0 ? (
                        <div className="flex gap-2">
                          {b.images.map((img, i) => (
                            <img
                              key={i}
                              src={`/api/services/${b._id}/image/${i}`}
                              alt="service"
                              className="w-24 h-24 object-cover rounded-md border"
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center text-gray-500 text-sm">
                          <ImageIcon className="h-4 w-4 mr-1" />
                          No images
                        </div>
                      )}

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
