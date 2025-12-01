// client/src/components/PaymentPortal.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { PaymentForm } from "./PaymentForm";
import { OrderSummary } from "./OrderSummary";

export function PaymentPortal() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  // These are passed from the booking screen
  const { booking, service, date, time } = location.state || {};

  const handleBackToBooking = () => {
    navigate(-1);
  };

  const handleCompletePayment = () => {
    setShowConfirmation(true);
  };

  const handlePaymentSuccess = () => {
    // After payment, send the user to their bookings history
    navigate("/bookings");
  };

  const handleGoToBookings = () => {
    setShowConfirmation(false);
    navigate("/bookings");
  };

  return (
    <div className="bg-[#f8f9fb] py-8">
      <main className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 mb-8">
          <button
            type="button"
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors text-sm"
            onClick={handleBackToBooking}
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Booking
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
              Complete Your Payment
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              Secure payment processing for your service booking.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <PaymentForm onSuccess={handlePaymentSuccess} />
          <div className="space-y-6">
            <OrderSummary
              booking={booking}
              service={service}
              date={date}
              time={time}
            />
            <Button
              className="w-full h-12 text-base"
              onClick={handleCompletePayment}
            >
              Complete Payment
            </Button>
          </div>
        </div>
      </main>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <DialogTitle className="text-center text-2xl">
              Booking Confirmed
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              Your payment is being processed. We&apos;ll send a confirmation
              email and SMS shortly.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center gap-3">
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Close
            </Button>
            <Button onClick={handleGoToBookings}>Go to My Bookings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
