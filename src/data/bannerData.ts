
export interface BannerSlide {
  id: number;
  title: string;
  subTitle: string;
  image: string;
  bgColor: string;
  buttonColor: string;
  link: string;
}

export const bannerData: BannerSlide[] = [
  {
    id: 1,
    title: "Protein Sattu at just Rs.99/-",
    subTitle: "Limited time offer",
    image: "/banners/sattu.png",
    bgColor: "bg-gradient-to-r from-amber-100 to-amber-50",
    buttonColor: "bg-amber-500 hover:bg-amber-600",
    link: "/product/6874f486954bd4c22d7b74a1", 
  },
  {
    id: 2,
    title: "Best Furniture Collection for Your Interior",
    subTitle: "New Arrivals",
    image: "/banners/furniture.png",
    bgColor: "bg-gradient-to-r from-blue-50 to-indigo-50",
    buttonColor: "bg-indigo-500 hover:bg-indigo-600",
    link: "/shop",
  },
  {
    id: 3,
    title: "Premium Quality Gym Equipment",
    subTitle: "Summer Sale",
    image: "/banners/gym.png",
    bgColor: "bg-gradient-to-r from-green-50 to-teal-50",
    buttonColor: "bg-teal-500 hover:bg-teal-600",
    link: "/shop",
  },
  {
    id: 4,
    title: "Exclusive Deals on Home Essentials",
    subTitle: "Limited Stock",
    image: "/banners/home-essentials.png",
    bgColor: "bg-gradient-to-r from-purple-50 to-pink-50",
    buttonColor: "bg-purple-500 hover:bg-purple-600",
    link: "/shop",
  },
];