import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { TrashIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function Checkout() {
  const { cart, getTotalPrice, clearCart, removeFromCart, updateQuantity } =
    useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    clearCart();
    navigate("/checkout-success");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-bloom-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="font-heading text-3xl md:text-4xl font-light text-bloom-3 mb-4">
              Your Cart
            </h1>
            <p className="font-sans text-bloom-3 mb-8">
              Your cart is empty. Start shopping to add items.
            </p>
            <a
              href="/products"
              className="inline-flex items-center bg-bloom-3 hover:bg-bloom-4 text-white font-button font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Browse Products
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bloom-1">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-light text-bloom-3 mb-2">
            Shopping Cart
          </h1>
          <p className="font-sans text-bloom-3">
            Review your items and proceed to checkout
          </p>
        </div>
        <div className="space-y-6 mb-12">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm border border-bloom-2 p-6"
            >
              <div className="flex items-center space-x-6">
                <div className="">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-heading text-lg font-medium text-bloom-4 capitalize line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="font-button text-xl font-bold text-bloom-3 mt-1">
                    {Number(item.price).toFixed(2)} kr
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 bg-bloom-2 hover:bg-bloom-3 text-bloom-4 hover:text-white rounded-full transition-colors duration-200"
                    disabled={item.quantity <= 1}
                  >
                    <MinusIcon className="w-4 h-4" />
                  </button>

                  <span className="font-button font-medium text-bloom-4 min-w-[2rem] text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 bg-bloom-2 hover:bg-bloom-3 text-bloom-4 hover:text-white rounded-full transition-colors duration-200"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-right">
                  <p className="font-button text-lg font-bold text-bloom-3">
                    {Number(item.price * item.quantity).toFixed(2)} kr
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors duration-200"
                  title="Remove item"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-bloom-2 p-8">
          <h2 className="font-heading text-2xl font-medium text-bloom-4 mb-6">
            Order Summary
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-sans text-bloom-3">
                Subtotal ({cart.length} item{cart.length !== 1 ? "s" : ""})
              </span>
              <span className="font-button text-lg font-medium text-bloom-4">
                {getTotalPrice()} kr
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-sans text-bloom-3">Shipping</span>
              <span className="font-button text-lg font-medium text-bloom-4">
                Free
              </span>
            </div>

            <div className="border-t border-bloom-2 pt-4">
              <div className="flex justify-between items-center">
                <span className="font-heading text-xl font-medium text-bloom-4">
                  Total
                </span>
                <span className="font-button text-2xl font-bold text-bloom-3">
                  {getTotalPrice()} kr
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full mt-8 bg-bloom-3 hover:bg-bloom-4 text-white font-button font-medium py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
          >
            Complete Order
          </button>
        </div>
      </div>
    </div>
  );
}
