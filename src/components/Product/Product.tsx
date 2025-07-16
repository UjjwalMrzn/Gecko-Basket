import { ShoppingCart, Heart } from 'lucide-react';
import StarRating from '../../components/StarRating/StarRating';
const products = [
  {
    id: 1,
    title: "Sattu - Roasted Gram Flour",
    category: "Groceries",
    description: "High-protein, nutritious roasted gram flour, perfect for traditional drinks and recipes.",
    price: 1299,
    originalPrice: 1599, // Added for sale comparison
    image: "/products/sattu.jpg", // Assuming a more relevant image
    rating: 4.5,
    reviews: 117,
    tag: "Sale", // Dynamic badge
  },
  {
    id: 2,
    title: "Gecko Works Mug",
    category: "Merchandise",
    description: "Start your day with a dose of code and coffee in this sturdy ceramic mug.",
    price: 699,
    originalPrice: null, // No sale on this item
    image: "/products/mug.jpg",
    rating: 5,
    reviews: 210,
    tag: "New",
  },
  {
    id: 3,
    title: "Developer Sticker Pack",
    category: "Accessories",
    description: "High-quality vinyl stickers for your laptop, featuring popular tech logos.",
    price: 499,
    originalPrice: null,
    image: "/products/stickers.jpg",
    rating: 4.8,
    reviews: 92,
    tag: null, // No badge on this item
  },
];

export default function ProductSection() {
  return (
    <section className="bg-[#fdfcf2] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center text-gray-800">
          Featured Products
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover our handpicked selection of quality goods, from nourishing staples to unique merchandise.
        </p>

        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative flex w-full max-w-xs flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container with Badges and Wishlist */}
              <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                <img
                  className="peer absolute top-0 right-0 h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                  src={product.image}
                  alt={product.title}
                />

                {/* Sale/New Badge */}
                {product.tag && (
                  <span className={`absolute top-2 left-2 m-2 rounded-full px-2 text-center text-sm font-medium text-white ${product.tag === 'Sale' ? 'bg-red-500' : 'bg-blue-500'}`}>
                    {product.tag}
                  </span>
                )}

                {/* Wishlist Button */}
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-200">
                  <Heart size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Product Info */}
              <div className="mt-4 px-5 pb-5 flex flex-col flex-grow">
                <div>
                  <a href="#">
                    <h3 className="text-xl font-bold tracking-tight text-slate-900">{product.title}</h3>
                  </a>
                  <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                </div>

                <div className="mt-2 mb-5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <p>
                      <span className="text-2xl font-bold text-slate-900">Rs. {product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-slate-900 line-through ml-2">Rs. {product.originalPrice}</span>
                      )}
                    </p>
                  </div>
                  <StarRating rating={product.rating} reviews={product.reviews} />
                </div>
                
                {/* Add to Cart Button */}
                <button className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 w-full transition-all">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
