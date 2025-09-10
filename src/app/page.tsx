import NavBar from "@/components/navBar";
import Footer from "@/components/footer";
import Carousel from "./carousel";
import CategorySection from "./allCategories";
import SeriesCategorySection from "./seriesCategory";
import HotDeals from "./hotDeals";
import connect from "@/dbConfig/dbConfig";
import ProductCategory from "@/Models/categoryModel";
import SeriesCategory from "@/Models/seriesCategory";
import Product from "@/Models/productModel";
import BottomInstagram from "@/components/bottomInstagram";
import ReviewCard from "@/components/ReviewCard";
import ReviewSchema from "@/Models/reviewModel";
// import DiscountAbove1999 from './discountabove1999';
// import DiscountAbove999 from './discountabove999';

export const revalidate = 60 * 60;

export default async function App() {
  connect();

  // const instagramGallaryData = await IsntagramProduct.find({});
  const [categoryData, seriesCategoryData, productsData, reviewData] =
    await Promise.all([
      ProductCategory.find({}),
      SeriesCategory.find({}),
      Product.find({ isHotDeal: true }),
      ReviewSchema.find({}),
    ]);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-black">
      <BottomInstagram />
      {/* <DiscountAbove999 /> */}
      <NavBar />
      <Carousel />
      <CategorySection categoryData={JSON.stringify(categoryData)} />
      {/* <DiscountAbove1999 /> */}
      <SeriesCategorySection
        seriesCategoryData={JSON.stringify(seriesCategoryData)}
      />
      <HotDeals productsData={JSON.stringify(productsData)} />
      <div>
        <p className=" text-white text-3xl font-semibold text-center mt-8">
          Crazzy Users Reviews
        </p>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviewData.map((reviewItem, idx) => (
            <ReviewCard key={idx} reviewItem={reviewItem} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
