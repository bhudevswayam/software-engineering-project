import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { User, Mail, Phone, MapPin, Edit2, Save, X, Trash } from "lucide-react";

import { fetchUserProfile, updateUserProfile, deleteUserProfile } from "../api/user";

export function UserProfile({ user: initialUser }) {
  const [user, setUser] = useState(initialUser);
  const [editedUser, setEditedUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load latest user profile from API when component mounts
  useEffect(() => {
  const loadUser = async () => {
    try {
      const data = await fetchUserProfile();
      console.log(data)
      // normalize keys
      const normalized = {
        ...data,
        phoneNo: data.phoneNo || data.phone || "",
        address: data.address || data.location || "",
      };

      setUser(normalized);
      setEditedUser(normalized);
    } catch (err) {
      console.error("Failed to load profile:", err);
    } finally {
      setLoading(false);
    }
  };
  loadUser();
}, []);

  // Save updated profile
  const handleSave = async () => {
  try {
    const updatedData = {
    name: editedUser.name,
    phoneNo: editedUser.phoneNo,
    addressLine1: editedUser.addressLine1,
    addressLine2: editedUser.addressLine2,
    city: editedUser.city,
    state: editedUser.state,
    zipCode: editedUser.zipCode,
    ...(editedUser.password ? { password: editedUser.password } : {})
  };

    const updated = await updateUserProfile(updatedData);
    setUser(updated);
    setEditedUser(updated);
    setIsEditing(false);
  } catch (err) {
    console.error(err);
    alert("Failed to update profile");
  }
};


  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  // Delete user account
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
      try {
        await deleteUserProfile();
        window.location.href = "/"; // redirect home
      } catch (err) {
        console.error(err);
        alert("Failed to delete account");
      }
    }
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Profile Card */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Personal Information</span>
              </CardTitle>
              <CardDescription>Keep your personal details up to date</CardDescription>
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                <Edit2 className="h-4 w-4 mr-2" /> Edit
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button onClick={handleSave} size="sm">
                  <Save className="h-4 w-4 mr-2" /> Save
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm">
                  <X className="h-4 w-4 mr-2" /> Cancel
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={editedUser.name || ""}
                    onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>{user.name}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{user.email}</span>
                  </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    type="tel"
                    value={editedUser.phoneNo}
                    onChange={(e) => setEditedUser({ ...editedUser, phoneNo: e.target.value })}
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{user.phoneNo || "N/A"}</span>
                  </div>
                )}
              </div>

              {/* Address Line 1 */}
              <div className="space-y-2">
                <Label htmlFor="addressLine1">Address Line 1</Label>
                {isEditing ? (
                  <Input
                    id="addressLine1"
                    value={editedUser.addressLine1 || ""}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, addressLine1: e.target.value })
                    }
                    placeholder="Address Line 1"
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{user.addressLine1 || "N/A"}</span>
                  </div>
                )}
              </div>
              
              {/* Address Line 2 */}
              <div className="space-y-2">
                <Label htmlFor="addressLine2">Address Line 2</Label>
                {isEditing ? (
                  <Input
                    id="addressLine2"
                    value={editedUser.addressLine2 || ""}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, addressLine2: e.target.value })
                    }
                    placeholder="Address Line 2"
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{user.addressLine2 || "N/A"}</span>
                  </div>
                )}
              </div>
              
              {/* City */}
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                {isEditing ? (
                  <Input
                    id="city"
                    value={editedUser.city || ""}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, city: e.target.value })
                    }
                    placeholder="City"
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{user.city || "N/A"}</span>
                  </div>
                )}
              </div>
              
              {/* State */}
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                {isEditing ? (
                  <Input
                    id="state"
                    value={editedUser.state || ""}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, state: e.target.value })
                    }
                    placeholder="State"
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{user.state || "N/A"}</span>
                  </div>
                )}
              </div>
              
              {/* Zip Code */}
              <div className="space-y-2">
                <Label htmlFor="zipCode">Zip Code</Label>
                {isEditing ? (
                  <Input
                    id="zipCode"
                    type="number"
                    value={editedUser.zipCode || ""}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, zipCode: e.target.value })
                    }
                    placeholder="Zip Code"
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{user.zipCode || "N/A"}</span>
                  </div>
                )}
              </div>



            </div>

            {/* Account Type */}
            <div className="pt-4 border-t flex items-center justify-between">
              <div>
                <h3 className="font-medium">Account Type</h3>
                <p className="text-sm text-muted-foreground">
                  {user.role === "business" ? "Business Partner" : "Regular User"}
                </p>
              </div>
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                {user.role === "business" ? "Business" : "Customer"}
              </div>
            </div>
          </CardContent>
        </Card>
      
      <Card className="mt-6">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences and security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive updates about your bookings</p>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Change Password</p>
                <p className="text-sm text-muted-foreground">Update your account password</p>
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Delete Account</p>
                <p className="text-sm text-muted-foreground">Permanently delete your account</p>
              </div>
              <Button variant="destructive" size="sm" onClick={handleDelete} className="flex items-center space-x-2">
                <Trash className="h-4 w-4" />
                <span>Delete Account</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        </div>
    </div>
  );
}




