import { useState } from "react";
import StarRating from "./StarRating";

type Props = {
  description: string;
  rating: number;
  reviews: number;
//   specs: Record<string, string>;
};

const TabSection = ({ description, rating, reviews }: Props) => {
  const [activeTab, setActiveTab] = useState<"desc" | "reviews">("desc");

  const tabs = [
    { key: "desc", label: "Description" },
    { key: "reviews", label: `Reviews (${reviews})` },
    // { key: "specs", label: "Specifications" },
  ];

  return (
    <div className="font-inter">
      {/* Headers */}
      <div className="flex gap-4 mb-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`py-2 px-4 text-sm font-medium border-b-2 ${
              activeTab === tab.key
                ? "border-[#59b143] text-[#59b143]"
                : "border-transparent text-gray-500 hover:text-[#59b143]"
            } transition`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-2 text-sm text-gray-700 leading-relaxed">
        {activeTab === "desc" && <p>{description}</p>}

        {activeTab === "reviews" && (
          <div>
            <p className="mb-2 font-semibold text-[#272343]">Customer Reviews</p>
            <StarRating rating={rating} reviews={reviews} />
            <p className="mt-2 text-sm text-gray-600">
              Verified users rated this product {rating}/5 from {reviews} reviews.
            </p>
          </div>
        )}

        {/* {activeTab === "specs" && (
          <ul className="space-y-2">
            {Object.entries(specs).map(([key, val]) => (
              <li key={key}>
                <strong className="text-[#272343]">{key}:</strong> {val}
              </li>
            ))}
          </ul>
        )} */}
      </div>
    </div>
  );
};

export default TabSection;
