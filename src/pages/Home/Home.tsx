import Banner from "../../components/home/Banner/Banner";
// import Brand from "../../components/Brand/Brand";
// import Categories from "../../components/home/Categories/Categories";
import ProductCard from "../../components/home/Product Card/ProductCard";
import Delivery from "../../components/home/Delivery/Delivery";
import ProductSection from "../../components/home/ProductsSection/ProductSection";
// import Features from "../../components/Features/Features";

const Home = () => {
  return (
    <div>
      {/* Banner Section */}
      <section className="w-full bg-[#f0f2f3] flex justify-center rounded-b-3xl">
        <Banner />
      </section>

      {/* Delivery Section */}
      <Delivery />

      <ProductSection />

    </div>
  );
};

export default Home;
