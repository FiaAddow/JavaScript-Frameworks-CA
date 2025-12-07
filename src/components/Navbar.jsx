import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const navigation = [
  { name: "Products", href: "/products", current: false },
  { name: "Contact", href: "/contact", current: false },
  // { name: "Login", href: "/login", current: false },
  // { name: "Register", href: "/register", current: false },
];

export default function Navbar() {
  const [profile, setProfile] = useState();
  const { getTotalItems } = useCart();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      return;
    }
    const proileData = localStorage.getItem("user");
    const parsedProfile = JSON.parse(proileData);

    setProfile(parsedProfile);
  }, []);

  return (
    <Disclosure as="nav" className="bg-bloom-1 relative">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-bloom-3 hover:bg-bloom-2 hover:text-bloom-4 focus:outline-2 focus:outline-bloom-3">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link to="/">
                <img
                  alt="Company Logo"
                  src="../images/logo.png"
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className="text-bloom-4 hover:text-bloom-3 hover:underline rounded-md px-3 py-2 text-sm font-medium font-sans transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative">
              <Link to="/checkout" className="relative">
                <ShoppingCartIcon className="h-6 w-6 text-bloom-4 hover:text-bloom-3 transition-colors duration-200" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-bloom-3 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-button">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden bg-bloom-1 border-t border-bloom-2">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className="text-bloom-4 hover:text-bloom-3 hover:bg-bloom-2 block rounded-md px-3 py-2 text-base font-medium font-sans transition-colors duration-200"
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
