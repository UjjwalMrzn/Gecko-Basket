import { useState, ReactNode } from "react";

type Tab = {
  title: string;
  content: ReactNode;
};

const tabData: Tab[] = [
  {
    title: "Our Policy",
    content: (
      <p className="mb-2">
        We offer a <strong>7-day return policy</strong> for any items that are damaged, defective, or incorrect.
        This means you have 7 days from the date of delivery to request a return.
      </p>
    ),
  },
  {
    title: "Conditions for Return",
    content: (
      <>
        <p className="mb-2">
          To be eligible for a return, the item must meet the following conditions:
        </p>
        <ul className="list-disc list-inside space-y-1 mb-2">
          <li>The item must be unused, undamaged, and in the same condition that you received it.</li>
          <li>It must be in its original packaging, including any protective wraps, boxes, or seals.</li>
          <li>All original tags, labels, or manuals must be attached or included.</li>
          <li>The return request must be made within <strong>7 days of delivery</strong>.</li>
          <li>A valid proof of purchase (e.g., order confirmation or receipt) is required.</li>
        </ul>
        <p className="mt-8">
          <strong>Note:</strong> Items that are damaged due to misuse, altered in any way, or returned without original packaging and tags may not be accepted.
        </p>
      </>
    ),
  },
  {
    title: "How to Start a Return",
    content: (
      <ol className="list-decimal list-inside space-y-1">
        <li>
          Email us at{" "}
          <a
            href="mailto:returns@geckobasket.com"
            className="text-blue-600 underline"
          >
            returns@geckobasket.com
          </a>{" "}
          with your order number and a photo of the item.
        </li>
        <li>Wait for our confirmation and instructions.</li>
        <li>Send the item back to the address we provide.</li>
      </ol>
    ),
  },
  {
    title: "Refund Process",
    content: (
      <>
        <p className="mb-2">
          Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, the refund will be processed to your original payment method within <strong>5–7 business days</strong>.
        </p>
        <p className="mb-2">
          The timing of the refund may vary depending on your bank or payment provider. Some providers may take a few extra days to reflect the amount in your account.
        </p>
        <p>
          <strong>Note:</strong> We do not charge any refund fees. However, delivery charges (if any) are non-refundable unless the return is due to our error.
        </p>
      </>
    ),
  },
];

export default function ReturnsRefunds() {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="min-h-screen bg-white font-sans-serif py-10">
      <h1 className="text-3xl font-bold mb-6 text-green-500 text-center">
        Returns & Refunds Policy
      </h1>

      {/* Tab Menu */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {tabData.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 rounded-full border transition-all ${
              activeTab === index
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white border rounded-md p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-3">{tabData[activeTab].title}</h2>
        <div className="text-gray-700">{tabData[activeTab].content}</div>
      </div>
    </div>
  );
}
