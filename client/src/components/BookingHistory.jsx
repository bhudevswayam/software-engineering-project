import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar, Clock, MapPin, User, Star, Search, Filter } from "lucide-react";

const mockBookings = [
  {
    id: "1",
    serviceName: "Home Cleaning",
    providerName: "CleanPro Services",
    providerRating: 4.8,
    date: "2024-01-15",
    time: "10:00 AM",
    location: "123 Main St, New York, NY",
    status: "completed",
    price: 120,
    description: "Deep cleaning service for 3-bedroom apartment"
  },
  {
    id: "2",
    serviceName: "Legal Consultation",
    providerName: "Smith & Associates Law",
    providerRating: 4.9,
    date: "2024-01-20",
    time: "2:00 PM",
    location: "Online Video Call",
    status: "completed",
    price: 200,
    description: "Contract review and legal advice"
  },
  {
    id: "3",
    serviceName: "Plumbing Repair",
    providerName: "QuickFix Plumbing",
    providerRating: 4.6,
    date: "2024-01-25",
    time: "11:30 AM",
    location: "456 Oak Ave, New York, NY",
    status: "upcoming",
    price: 85,
    description: "Kitchen sink repair and maintenance"
  },
  {
    id: "4",
    serviceName: "Tax Preparation",
    providerName: "TaxPro Accounting",
    providerRating: 4.7,
    date: "2024-01-10",
    time: "3:30 PM",
    location: "789 Pine St, New York, NY",
    status: "cancelled",
    price: 150,
    description: "Personal tax return preparation"
  }
];

export function BookingHistory() {
  const [bookings] = useState(mockBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.providerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl mb-2">My Bookings</h1>
          <p className="text-muted-foreground">Track your service bookings and history</p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search bookings..."
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
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No bookings found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== "all" 
                    ? "Try adjusting your search or filter criteria" 
                    : "You haven't made any bookings yet"
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredBookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium">{booking.serviceName}</h3>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 mb-1">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{booking.providerName}</span>
                        <div className="flex items-center space-x-1">
                          {renderStars(booking.providerRating)}
                          <span className="text-sm text-gray-600">({booking.providerRating})</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right mt-2 md:mt-0">
                      <p className="text-xl font-semibold">${booking.price}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
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
                      <span className="truncate">{booking.location}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{booking.description}</p>

                  <div className="flex justify-end space-x-2">
                    {booking.status === "upcoming" && (
                      <>
                        <Button variant="outline" size="sm">Reschedule</Button>
                        <Button variant="destructive" size="sm">Cancel</Button>
                      </>
                    )}
                    {booking.status === "completed" && (
                      <>
                        <Button variant="outline" size="sm">Book Again</Button>
                        <Button variant="outline" size="sm">Leave Review</Button>
                      </>
                    )}
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-semibold text-green-600">
                {bookings.filter(b => b.status === "completed").length}
              </div>
              <p className="text-sm text-muted-foreground">Completed Bookings</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-semibold text-blue-600">
                {bookings.filter(b => b.status === "upcoming").length}
              </div>
              <p className="text-sm text-muted-foreground">Upcoming Bookings</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-semibold text-primary">
                ${bookings.reduce((total, booking) => total + booking.price, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}