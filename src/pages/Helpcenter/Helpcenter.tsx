// src/pages/FAQ.tsx
import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { ReactNode } from "react";

type FAQItem = {
  question: string;
  answer: string | ReactNode;
};

const faqs: FAQItem[] = [
  {
    question: "How do I place an order?",
    answer: `Browse and select the products you like.
             Add them to your cart and proceed to checkout.
             Fill in your shipping and payment details.
             Confirm your order to complete the purchase.`,
  },
  {
    question: "What payment methods do you accept?",
    answer: `We accept eSewa, Khalti, and Cash on Delivery.`,
  },
  {
    question: "How can I track my order?",
    answer:
      "After purchase, you will receive a tracking link via email or SMS to monitor your order status.",
  },
  {
    question: "What should I do if I receive a damaged or incorrect item?",
    answer: (
      <>
        Please contact our support immediately. See our{" "}
        <a href="/Contact" className="text-blue-600 underline">
          Returns & Refunds Policy
        </a>{" "}
        for full details.
      </>
    ),
  },
  {
    question: "Do you ship outside Kathmandu Valley?",
    answer:
      "Yes, we ship to select areas outside Kathmandu Valley. Shipping fees and delivery times may vary.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen w-full p-6 font-sans-serif bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-500">Help Center</h1>
      <div className="space-y-4">
        {faqs.map(({ question, answer }, index) => (
          <div key={index} className="border rounded-md">
            <button
              onClick={() => toggle(index)}
              className="w-full text-left px-4 py-3 font-semibold bg-white hover:bg-green-100 flex justify-between items-center"
            >
              <span>{question}</span>
              <span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-green-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-green-600" />
                )}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-4 py-3 bg-white whitespace-pre-line border-t">
                {answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
