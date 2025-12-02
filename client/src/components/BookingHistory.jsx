import { useState, useEffect } from "react";
import { getAllBookings, updateBookingStatus  } from "../api/bookings"; // adjust if path differs
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar, Clock, MapPin, User, Search, Filter } from "lucide-react";

export function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingStatus, setEditingStatus] = useState({});
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const role = storedUser.role || "user";
  
  useEffect(() => {
  const fetchBookings = async () => {
    try {
      const data = await getAllBookings();

      const formatted = data.map((b) => {
        if (role === "business") {
          // 🏢 Show USER details for businesses
          return {
            id: b._id,
            clientName: b?.user?.name || "Unknown User",
            clientEmail: b?.user?.email || "N/A",
            clientPhone: b?.user?.phoneNo || "N/A",
            address: `${b?.user?.addressLine1 || ""}, ${b?.user?.city || ""}, ${b?.user?.state || ""}`,
            date: b.start,
            time: new Date(b.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            serviceName: b?.service?.name || "Service Not Available",
            price: b.price || b?.service?.priceRange || 0,
            status: b.status || "pending",
            description: `Service: ${b?.service?.name || "Unknown"}`
          };
        } else {
          // 👤 Show SERVICE details for normal users
          return {
            id: b._id,
            serviceName: b?.service?.name || "Service Not Available",
            providerName: b?.business?.name || "Not Provided",
            providerEmail: b?.business?.email || "N/A",
            date: b.start,
            time: new Date(b.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            status: b.status || "pending",
            price: b.price || b?.service?.priceRange || 0,
            location: b?.business?.email || "Online / Not Available",
            description: `Service by ${b?.business?.name || "Unknown"}`
          };
        }
      });

      setBookings(formatted);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  fetchBookings();
}, [role]);


  // ✅ Filter + Search Logic
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.providerName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Edit Booking Status Handler
  const handleStatusUpdate = async (id) => {
    const newStatus = editingStatus[id];
    if (!newStatus) return;
    try {
      await updateBookingStatus(id, newStatus);

      // Update UI instantly
      setBookings((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, status: newStatus } : b
        )
      );

      // Remove from editing state
      setEditingStatus((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });

    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "pending":
        return { variant: "secondary", className: "" };

      case "confirmed":
        return { variant: "default", className: "" };

      case "completed":
        return { variant: "outline", className: "text-green-700 border-green-300" };

      case "cancelled":
        return { variant: "destructive", className: "" };

      default:
        return { variant: "secondary", className: "" };
    }
  };


  return (
  <div className="container mx-auto px-4 py-8">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl mb-4 font-medium">My Bookings</h1>

      {/* ✅ Search + Status Filter */}
      <Card className="mb-6">
        <CardContent className="pt-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by service or provider..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* ✅ Booking Cards */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium">No bookings found</h3>
              <p className="text-muted-foreground">Try adjusting search or filters.</p>
            </CardContent>
          </Card>
        ) : (
          filteredBookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium">
                      {role === "business" ? booking.clientName : booking.serviceName}
                    </h3>
                    {(() => {
                      const { variant, className } = getStatusBadgeVariant(booking.status);
                      return (
                        <Badge variant={variant} className={className}>
                          {booking.status}
                        </Badge>
                      );
                    })()}
                  </div>
                  <div className="text-right text-xl font-semibold">
                    ${booking.price}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(booking.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{booking.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {role === "business" ? booking.address : booking.location}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  {role === "business"
                    ? `Client Email: ${booking.clientEmail} | Phone: ${booking.clientPhone}`
                    : booking.description}
                </p>
                <div className="flex justify-between items-center mt-4">

  {/* LEFT SIDE — Edit Status (Business only) */}
  {role === "business" && (
    <div className="flex items-center gap-2">

      {/* Status Dropdown */}
      <Select
        value={editingStatus[booking.id] || booking.status}
        onValueChange={(v) =>
          setEditingStatus((prev) => ({ ...prev, [booking.id]: v }))
        }
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Change Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="confirmed">Confirmed</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>

      {/* Save Button */}
      <Button
        size="sm"
        onClick={() => handleStatusUpdate(booking.id)}
        disabled={
          !editingStatus[booking.id] ||
          editingStatus[booking.id] === booking.status
        }
      >
        Save
      </Button>
    </div>
  )}

  {/* RIGHT SIDE — View Details */}
  <Button size="sm" variant="outline">View Details</Button>
</div>

              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* ✅ Summary Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-semibold text-green-600">
              {bookings.filter((b) => b.status === "completed").length}
            </div>
            <p className="text-sm text-muted-foreground">Completed Bookings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-semibold text-blue-600">
              {bookings.filter((b) => b.status === "confirmed").length}
            </div>
            <p className="text-sm text-muted-foreground">Upcoming Bookings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-semibold text-primary">
              ${bookings.reduce((total, b) => total + (b.price || 0), 0)}
            </div>
            <p className="text-sm text-muted-foreground">Total Spent</p>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

}
