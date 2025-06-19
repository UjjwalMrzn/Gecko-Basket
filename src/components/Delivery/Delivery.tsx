import { Clock3, Percent, ShieldCheck, Truck } from "lucide-react";

const deliveryItems = [
  {
    icon: <Percent size={40} className="text-green-600" />,
    title: "Discount",
    description: "Every week new sales",
  },
  {
    icon: <ShieldCheck size={40} className="text-green-600" />,
    title: "Secure Payment",
    description: "100% secure payment method",
  },
  {
    icon: <Clock3 size={40} className="text-green-600" />,
    title: "Great Support 24/7",
    description: "We care about your experience",
  },
  {
    icon: <Truck size={40} className="text-green-600" />,
    title: "Free Delivery",
    description: "100% free for all orders",
  },
];

const Delivery = () => {
  return (
    <section className="container mx-auto bg-white shadow-md p-7 rounded-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {deliveryItems.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="flex-shrink-0">{item.icon}</div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-1">
                {item.title}
              </h4>
              <p className="text-l text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Delivery;
