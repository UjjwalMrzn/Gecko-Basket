import Banner from "../../components/Banner/Banner";
import Brand from "../../components/Brand/Brand";
import Categories from "../../components/Categories/Categories";
import Client from "../../components/Client/Client";
import Product from "../../components/Product/Product";
import Recent from "../../components/Recent/Recent";
import Delivery from "../../components/Delivery/Delivery";
import Features from "../../components/Features/Features";

const Home = () => {
  return (
    <div>
      {/* Banner Section */}
      <section className="w-full bg-[#f0f2f3] flex items-center justify-center rounded-b-3xl">
        <Banner />
      </section>

      {/* Delivery Section */}
      <section className="w-full min-h-[150px]">
        <Delivery />
      </section>

      {/* Brand Section */}
      <section className="flex items-center justify-center h-[171px] w-full my-8">
        <Brand />
      </section>

      {/* Features Section */}
      <section className="w-full flex items-center justify-center mb-[80px]">
        <Features />
      </section>

      {/* Categories Section */}
      <section className="w-full flex items-center justify-center mb-[80px]">
        <Categories />
      </section>

      {/* Product Section */}
      <section className="w-full flex items-center justify-center pb-[80px]">
        <Product />
      </section>

      {/* Client Testimonials Section */}
      <section className="w-full flex items-center justify-center bg-[#f0f2f3] min-h-[589px] py-[80px]">
        <Client />
      </section>

      {/* Recent Items Section */}
      <section className="w-full flex items-center justify-center py-[80px]">
        <Recent />
      </section>
    </div>
  );
};

export default Home;
