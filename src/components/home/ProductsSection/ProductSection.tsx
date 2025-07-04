import ProductCard from "../Product Card/ProductCard";

const products = [
  {
    id: 1,
    title: "Sattu - Roasted Gram Flour",
    category: "Groceries",
    description: "High-protein roasted gram flour for traditional drinks.",
    price: 1299,
    originalPrice: 1599,
    image: "/products/sattu.jpg",
    rating: 4.5,
    reviews: 117,
    tag: "Sale",
  },
  {
    id: 2,
    title: "Gecko Works Mug",
    category: "Merchandise",
    description: "Ceramic mug for your daily coffee + code.",
    price: 699,
    originalPrice: null,
    image: "/products/mug.jpg",
    rating: 5,
    reviews: 210,
    tag: "New",
  },
  {
    id: 3,
    title: "Developer Sticker Pack",
    category: "Accessories",
    description: "High-quality tech logo stickers.",
    price: 499,
    originalPrice: null,
    image: "/products/stickers.jpg",
    rating: 4.8,
    reviews: 92,
    tag: null,
  },
  {
    id: 4,
    title: "Developer Sticker Pack",
    category: "Accessories",
    description: "High-quality tech logo stickers.",
    price: 499,
    originalPrice: null,
    image: "/products/stickers.jpg",
    rating: 4.8,
    reviews: 92,
    tag: "Sale",
  },
];

const ProductSection = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#272343] mb-4">
          Featured Products
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-sm sm:text-base">
          Discover our handpicked selection of quality goods, from nourishing staples to unique merchandise.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
