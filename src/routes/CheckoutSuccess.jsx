import { Link } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen bg-bloom-1">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="mb-8">
            <CheckCircleIcon className="w-24 h-24 text-green-500 mx-auto" />
          </div>

          <h1 className="font-heading text-4xl md:text-5xl font-light text-bloom-3 mb-4">
            Order Confirmed
          </h1>

          <p className="font-sans text-xl text-bloom-3 mb-2">
            Thank you for your purchase!
          </p>

          <p className="font-sans text-bloom-3 mb-12 max-w-md mx-auto">
            Your order has been successfully placed and will be processed
            shortly. You'll receive a confirmation email with your order
            details.
          </p>

          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center w-full sm:w-auto bg-bloom-3 hover:bg-bloom-4 text-white font-button font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
