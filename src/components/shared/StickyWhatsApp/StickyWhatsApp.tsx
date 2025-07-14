import { FaWhatsapp } from "react-icons/fa";

export default function StickyWhatsApp() {
  const phoneNumber = "9779840209417";
  const message = encodeURIComponent("Hello! I want to know more about Gecko Basket.");

  return (
    <a
      id="sticky-whatsapp"
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg transition-colors"
    >
      <FaWhatsapp className="text-white" size={28} />
    </a>
  );
}
