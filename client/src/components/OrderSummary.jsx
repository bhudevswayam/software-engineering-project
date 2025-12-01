// client/src/components/OrderSummary.jsx
import React from "react";
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  Star,
} from "lucide-react";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function OrderSummary({ booking, service, date, time }) {
  const bookingDate =
    date ? new Date(date) : booking && booking.start ? new Date(booking.start) : null;

  const dateLabel =
    bookingDate != null
      ? bookingDate.toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "November 15, 2025";

  const timeLabel =
    time ||
    (bookingDate
      ? bookingDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "10:00 AM - 12:00 PM");

  const serviceName =
    (service && service.name) ||
    (booking && booking.service && booking.service.name) ||
    "Home Cleaning Service";

  const location =
    (booking &&
      booking.business &&
      (booking.business.address || booking.business.location)) ||
    "123 Main Street, New York, NY";

  const baseAmount =
    booking && typeof booking.price === "number" ? booking.price : 120;

  const serviceFee = 12;
  const tax = 10.56;
  const total = (baseAmount + serviceFee + tax).toFixed(2);

  const providerName =
    (booking && booking.business && booking.business.name) ||
    "John Doe Cleaning";

  const providerInitials = providerName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-6">
      {/* Service Details */}
      <Card className="p-6 bg-white">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Service Booked
            </h3>
            <p className="text-xs text-gray-500">Your booking is confirmed</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
            <div>
              <div className="text-xs text-gray-500">Date</div>
              <div className="text-sm font-medium text-gray-900">
                {dateLabel}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
            <div>
              <div className="text-xs text-gray-500">Time</div>
              <div className="text-sm font-medium text-gray-900">
                {timeLabel}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
            <div>
              <div className="text-xs text-gray-500">Location</div>
              <div className="text-sm font-medium text-gray-900">
                {location}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Price Summary */}
      <Card className="p-6 bg-white">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Order Summary
        </h3>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">{serviceName}</span>
            <span className="text-gray-900">${baseAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Service Fee</span>
            <span className="text-gray-900">${serviceFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between pb-2">
            <span className="text-gray-600">Tax</span>
            <span className="text-gray-900">${tax.toFixed(2)}</span>
          </div>

          <Separator />

          <div className="flex justify-between pt-2 text-sm font-semibold">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">${total}</span>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-800">
          <AlertCircle className="w-4 h-4 mt-0.5" />
          <p>
            You&apos;ll receive a confirmation email and SMS once payment is
            processed.
          </p>
        </div>
      </Card>

      {/* Provider */}
      <Card className="p-6 bg-white">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Service Provider
        </h3>

        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{providerInitials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-medium text-gray-900">
              {providerName}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span>4.8 Average Rating</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
