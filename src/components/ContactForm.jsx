import { useState } from "react";

export default function ContactForm() {
  const [error, setError] = useState();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const fullName = formData.get("fullName").trim();
    const subject = formData.get("subject").trim();
    const email = formData.get("email").trim();
    const body = formData.get("body").trim();

    // Validate email
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Log the form results
    console.log("Contact form submitted:", { fullName, subject, email, body });
    e.target.reset();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-bloom-2 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-bloom-4 mb-2"
            >
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter your full name"
              required
              minLength="3"
              className="w-full px-4 py-3 border border-bloom-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-bloom-3 focus:border-transparent font-sans transition-colors duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-bloom-4 mb-2"
            >
              Subject *
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              placeholder="Enter subject"
              required
              minLength="3"
              className="w-full px-4 py-3 border border-bloom-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-bloom-3 focus:border-transparent font-sans transition-colors duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-bloom-4 mb-2"
            >
              Email *
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 border border-bloom-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-bloom-3 focus:border-transparent font-sans transition-colors duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="body"
              className="block text-sm font-medium text-bloom-4 mb-2"
            >
              Message *
            </label>
            <textarea
              name="body"
              id="body"
              placeholder="Enter your message"
              rows="5"
              required
              minLength="3"
              className="w-full px-4 py-3 border border-bloom-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-bloom-3 focus:border-transparent font-sans transition-colors duration-200 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-bloom-3 hover:bg-bloom-4 text-white font-button font-medium py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
          >
            Send Message
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 font-sans text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
