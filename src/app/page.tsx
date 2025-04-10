import NavBar from '@/components/navBar';
import Footer from '@/components/footer';
import Carousel from './carousel';
import CategorySection from './allCategories';
import SeriesCategorySection from './seriesCategory';
import HotDeals from './hotDeals';
import connect from '@/dbConfig/dbConfig';
import ProductCategory from '@/Models/categoryModel';
import SeriesCategory from '@/Models/seriesCategory';
import Product from '@/Models/productModel';
import BottomInstagram from '@/components/bottomInstagram';
// import DiscountAbove1999 from './discountabove1999';
// import DiscountAbove999 from './discountabove999';

export const revalidate = 60 * 60;

export default async function App() {
  connect();

  // const instagramGallaryData = await IsntagramProduct.find({});
  const categoryData = await ProductCategory.find({});
  const seriesCategoryData = await SeriesCategory.find({});
  const productsData = await Product.find({
    isHotDeal: true,
  });

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
      <Footer />
    </div>
  );
}
