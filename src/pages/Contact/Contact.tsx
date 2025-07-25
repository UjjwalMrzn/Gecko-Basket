import React, { useRef } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import emailjs from "@emailjs/browser";

const ContactUs: React.FC = () => {
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm(
        "service_vmkgsln",     // Your EmailJS service ID
        "template_0jl0fbx",    // Your EmailJS template ID
        form.current,
        "jAoRTEH8gtHsLnzbm"    // Your EmailJS public key
      )
      .then(
        () => {
          alert("Message sent successfully!");
          form.current?.reset();
        },
        (error) => {
          alert("Failed to send message. Please try again later.");
          console.error(error);
        }
      );
  };

  return (
    <section className="bg-gray-50 p-6 font-sans-serif text-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left side */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-green-700">Contact Us</h2>
          <p className="text-gray-600">
            We'd love to hear from you. Whether you have a question, need assistance, or just want to share feedback — we're here for you.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Mail className="text-green-400 w-5 h-5 mb-6" />
              <div>
                <h4 className="font-semibold text-lg">Email</h4>
                <p>customer.support@geckobasket.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-red-600 w-5 h-5 mb-6" />
              <div>
                <h4 className="font-semibold text-lg">Phone</h4>
                <p>+977 9765009755</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="text-green-600 w-5 h-5 mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Address</h4>
                <p>
                  Gecko Basket <br />
                  Bhotebahal, Kathmandu, Nepal
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <form ref={form} onSubmit={sendEmail} className="space-y-5">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="user_email"
                placeholder="your@email.com"
                className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Message</label>
              <textarea
                name="message"
                placeholder="Write your message..."
                rows={4}
                className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
