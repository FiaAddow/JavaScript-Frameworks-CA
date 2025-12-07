export default function Footer() {
  return (
    <footer className="bg-bloom-3 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="font-heading text-lg font-medium mb-1">
              Bloom & Co
            </h3>
            <p className="font-sans text-sm text-bloom-2">
              Curating beauty, one product at a time
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="font-sans text-sm text-bloom-2">
              © 2025 Bloom & Co. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
