import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function meta({}) {
  return [{ title: "Products" }, { name: "Bloom & Co" }];
}
const API = import.meta.env.VITE_API_URL;

export default function Products() {
  const [products, setProducts] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value && products) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API}/online-shop`);
      if (response.status === 200) {
        const data = await response.json();
        setProducts(data.data);
      } else if (response.status === 404) {
        setProducts({ error: "Products not found" });
      } else {
        setProducts({ error: "Error " + response.status });
      }
    };

    fetchData();
  }, []);

  if (products) {
    return (
      <div className="min-h-screen bg-bloom-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl md:text-5xl font-light text-bloom-3 mb-4">
              Our Collection
            </h1>
            <p className="font-sans text-bloom-3 max-w-2xl mx-auto">
              Discover our carefully curated selection of premium products
            </p>
          </div>

          <div className="max-w-md mx-auto mb-12 relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 border border-bloom-3 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-bloom-3 focus:border-transparent font-sans"
            />
            {filteredProducts.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-bloom-2 rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto">
                {filteredProducts.map((product) => (
                  <Link
                    to={`/products/${product.id}`}
                    key={product.id}
                    className="block px-4 py-3 hover:bg-bloom-2 border-b border-bloom-2 last:border-b-0 transition-colors duration-150"
                    onClick={() => setSearchTerm("")}
                  >
                    <div className="flex items-center">
                      <img
                        className="w-12 h-12 object-cover rounded mr-3"
                        src={
                          product?.image
                            ? product?.image.url
                            : "../images/placeholder.png"
                        }
                        alt=""
                      />
                      <div>
                        <h3 className="font-medium text-sm text-bloom-4 capitalize">
                          {product.title}
                        </h3>
                        <p className="text-xs text-bloom-3 truncate">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link
                to={`/products/${product.id}`}
                key={product.id}
                className="group"
              >
                <div className="bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                  <div className="aspect-square overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      src={
                        product?.image
                          ? product?.image.url
                          : "../images/placeholder.png"
                      }
                      alt=""
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="font-heading text-lg font-medium text-bloom-4 mb-2 capitalize line-clamp-2">
                      {product.title}
                    </h2>
                    <p className="font-sans text-sm text-bloom-3 mb-4 line-clamp-3 flex-grow">
                      {product.description}
                    </p>
                    <button className="bg-bloom-3 hover:bg-bloom-4 text-white font-button font-medium py-2 px-6 rounded-full shadow-sm hover:shadow-md transition-all duration-200 w-full">
                      View Details
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
