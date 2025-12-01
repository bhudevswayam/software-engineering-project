// client/src/components/PaymentForm.jsx
import React, { useState } from "react";
import { CreditCard, Building2, Lock } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Card } from "./ui/card";

export function PaymentForm({ onSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: integrate real payment gateway here.
    const confirmed = window.confirm(
      "Proceed with payment and confirm your booking?"
    );

    if (!confirmed) {
      return;
    }

    alert("Your booking is confirmed. A receipt is on the way.");
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Payment Method Selection */}
      <Card className="p-6 bg-white">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Payment Method
        </h2>

        <RadioGroup
          value={paymentMethod}
          onValueChange={setPaymentMethod}
          className="grid gap-3 sm:grid-cols-2"
        >
          <Label
            htmlFor="card"
            className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition ${
              paymentMethod === "card"
                ? "border-black bg-gray-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <RadioGroupItem id="card" value="card" className="mt-0.5" />
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </span>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  Credit / Debit Card
                </div>
                <div className="text-xs text-gray-500">
                  Pay securely with your card
                </div>
              </div>
            </div>
          </Label>

          <Label
            htmlFor="bank"
            className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition ${
              paymentMethod === "bank"
                ? "border-black bg-gray-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <RadioGroupItem id="bank" value="bank" className="mt-0.5" />
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </span>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  Bank Transfer
                </div>
                <div className="text-xs text-gray-500">
                  Direct bank account payment
                </div>
              </div>
            </div>
          </Label>
        </RadioGroup>
      </Card>

      {/* Card payment */}
      {paymentMethod === "card" && (
        <Card className="p-6 bg-white">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Card Details
          </h2>

          <div className="space-y-4">
            <div>
              <Label className="text-sm text-gray-700">Cardholder Name</Label>
              <Input placeholder="John Smith" className="mt-1" />
            </div>

            <div>
              <Label className="text-sm text-gray-700">Card Number</Label>
              <Input placeholder="1234 5678 9012 3456" className="mt-1" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-700">Expiry Date</Label>
                <Input placeholder="MM/YY" className="mt-1" />
              </div>
              <div>
                <Label className="text-sm text-gray-700">CVV</Label>
                <Input placeholder="123" className="mt-1" />
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-blue-50 p-3 rounded-lg mt-2">
              <Lock className="w-4 h-4 text-blue-600" />
              <span>Your payment information is encrypted and secure</span>
            </div>
          </div>
        </Card>
      )}

      {/* Bank transfer */}
      {paymentMethod === "bank" && (
        <Card className="p-6 bg-white">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Bank Account Details
          </h2>

          <div className="space-y-4">
            <div>
              <Label className="text-sm text-gray-700">
                Account Holder Name
              </Label>
              <Input placeholder="John Smith" className="mt-1" />
            </div>

            <div>
              <Label className="text-sm text-gray-700">Account Number</Label>
              <Input placeholder="00123456789" className="mt-1" />
            </div>

            <div>
              <Label className="text-sm text-gray-700">Routing Number</Label>
              <Input placeholder="011000015" className="mt-1" />
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-blue-50 p-3 rounded-lg mt-2">
              <Lock className="w-4 h-4 text-blue-600" />
              <span>Your bank information is encrypted and secure</span>
            </div>
          </div>
        </Card>
      )}

      {/* Billing address */}
      <Card className="p-6 bg-white">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Billing Address
        </h2>

        <div className="space-y-4">
          <div>
            <Label className="text-sm text-gray-700">Street Address</Label>
            <Input placeholder="123 Main Street" className="mt-1" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-700">City</Label>
              <Input placeholder="New York" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm text-gray-700">State</Label>
              <Input placeholder="NY" className="mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-700">ZIP Code</Label>
              <Input placeholder="10001" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm text-gray-700">Country</Label>
              <Input placeholder="United States" className="mt-1" />
            </div>
          </div>
        </div>
      </Card>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-black hover:bg-gray-800 text-white h-12 text-sm sm:text-base"
      >
        Pay Now
      </Button>

      <p className="text-center text-xs sm:text-sm text-gray-500">
        By completing this payment, you agree to ServiceHub&apos;s Terms of
        Service and Privacy Policy
      </p>
    </form>
  );
}
