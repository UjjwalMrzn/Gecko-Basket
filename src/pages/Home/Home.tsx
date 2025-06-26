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
      <section className="w-full bg-[#f0f2f3] flex justify-center rounded-b-3xl">
        <Banner />
      </section>

      {/* Delivery Section */}
      <Delivery />

      <Product />

    </div>
  );
};

export default Home;
