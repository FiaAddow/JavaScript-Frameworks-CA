import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Bids from "../components/bids.jsx";
import { useCart } from "../contexts/CartContext.jsx";

const API = import.meta.env.VITE_API_URL;

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const { addToCart } = useCart();

  console.log(product);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API}/online-shop/${id}`);

      if (response.status === 200) {
        const data = await response.json();
        setProduct(data.data);
      } else if (response.status === 404) {
        setProduct({ error: "Product not found" });
      } else {
        setProduct({ error: "Error " + response.status });
      }
    };

    fetchData();
  }, []);

  if (!product) {
    return <p>Loading...</p>;
  }

  if (product.error) {
    console.error(product.error);

    return <p>{product.error}</p>;
  }
  return (
    <div className="min-h-screen bg-bloom-1">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-light text-bloom-3 mb-2">
            Product Details
          </h1>
          <p className="font-sans text-bloom-3">
            Discover the perfect addition to your collection
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 gap-0 border-2 border-bloom-2 overflow-hidden shadow-lg">
          <div className="lg:row-span-2 bg-white border-r border-b border-bloom-2 flex items-center justify-center p-8">
            {product.image && (
              <img
                className="w-full max-w-sm h-auto object-cover rounded-lg shadow-md"
                src={product?.image?.url}
                alt={product.title}
              />
            )}
          </div>

          <div className="bg-white p-8 border-b border-bloom-2">
            <div className="space-y-6">
              <h1 className="font-heading text-2xl md:text-3xl font-medium text-bloom-4 capitalize">
                {product.title}
              </h1>

              <div className="flex items-center space-x-4">
                {product.discountedPrice ? (
                  <div className="space-y-1 gap-x-2 inline-flex">
                    <p className="font-button text-xl text-bloom-3">
                      {product.discountedPrice} kr
                    </p>
                    <p className="font-sans text-xl font-light text-red-500 line-through">
                      {product.price} kr
                    </p>
                  </div>
                ) : (
                  <p className="font-button text-xl font-bold text-bloom-3">
                    {product.price} kr
                  </p>
                )}
              </div>

              <button
                onClick={() =>
                  addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.discountedPrice || product.price,
                    image: product.image?.url || "../images/placeholder.png",
                  })
                }
                className="flex justify-items-end justify-center w-full bg-bloom-3 hover:bg-bloom-4 text-white font-button font-medium py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                title="Add to Cart"
              >
                <ShoppingCartIcon className="w-5 h-5 mr-2" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-8">
            {product.description && (
              <div>
                <h3 className="font-heading text-lg font-medium text-bloom-4 mb-3">
                  Description
                </h3>
                <p className="font-sans text-bloom-3 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}
          </div>

          {product.reviews && product.reviews.length > 0 && (
            <div className="lg:col-span-2 bg-white p-8 border-t border-bloom-2">
              <h3 className="font-heading text-xl font-medium text-bloom-4 mb-6">
                Customer Reviews
              </h3>
              <div className="grid gap-6 md:grid-cols-1">
                {product.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-bloom-1 p-4 rounded-sm w-full border border-bloom-2"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-button font-medium text-bloom-4">
                        {review.username}
                      </span>
                      <div className="flex items-center space-x-1">
                        <span className="font-sans text-sm text-bloom-3">
                          Rating:
                        </span>
                        <span className="font-button font-medium text-bloom-4">
                          {review.rating}/5
                        </span>
                      </div>
                    </div>
                    <p className="font-sans text-bloom-3 italic">
                      "{review.description}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
