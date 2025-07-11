// src/components/home/ProductCard/ProductCardSkeleton.tsx
const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-xl shadow border border-gray-200 flex flex-col overflow-hidden">
      {/* Image Skeleton */}
      <div className="aspect-[4/3] bg-gray-100" />

      {/* Info Skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
        <div className="h-3 w-1/2 bg-gray-200 rounded" />
        <div className="h-4 w-24 bg-gray-200 rounded" />

        {/* Price Row */}
        <div className="flex items-center justify-between mt-3">
          <div className="space-y-2">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-3 w-12 bg-gray-200 rounded" />
          </div>
          <div className="h-6 w-12 bg-gray-200 rounded-full" />
        </div>

        {/* Button */}
        <div className="h-10 w-full bg-gray-200 rounded-lg mt-3" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
