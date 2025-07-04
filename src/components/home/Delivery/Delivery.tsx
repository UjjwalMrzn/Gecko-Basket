import { Clock3, Percent, ShieldCheck, Truck } from "lucide-react";

const deliveryItems = [
  {
    icon: <Percent size={36} className="text-green-600" />,
    title: "Discount",
    description: "Every week new sales",
  },
  {
    icon: <ShieldCheck size={36} className="text-green-600" />,
    title: "Secure Payment",
    description: "100% secure payment method",
  },
  {
    icon: <Clock3 size={36} className="text-green-600" />,
    title: "Great Support 24/7",
    description: "We care about your experience",
  },
  {
    icon: <Truck size={36} className="text-green-600" />,
    title: "Emergency Delivery",
    description: "1-day delivery",
  },
];

const Delivery = () => {
  return (
    <section className="container mx-auto px-4 bg-white shadow-md p-6 rounded-2xl -mt-12 relative z-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {deliveryItems.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="flex-shrink-0">{item.icon}</div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-1">
                {item.title}
              </h4>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Delivery;
