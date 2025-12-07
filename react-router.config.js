export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  prerender: [
    "/",
    "/products",
    "/profile",
    "/contact",
    "/checkout",
    "/checkout-success",
  ],
};
