import ShowProductDetail from './showProductDetails';
import NavBar from '@/components/navBar';
import Footer from '@/components/footer';
import connect from '@/dbConfig/dbConfig';
import Product from '@/Models/productModel';
import { CartProvider } from '@/const/cartContext';
import BottomInstagram from '@/components/bottomInstagram';
import { Metadata } from 'next';

async function fetchProductData(id: string) {
  await connect();
  const [productData] = await Product.find({ id });
  return productData;
}

// generateMetadata function
export async function generateMetadata(context: any): Promise<Metadata> {
  const productData = await fetchProductData(context.params.id);
  return {
    title: productData.name,
    description: productData.description,
  };
}

// SingleCardPage Component
const SingleCardPage = async (context: any) => {
  const productData = await fetchProductData(context.params.id);

  const similarProducts = await Product.find({
    series: productData.series,
    category: productData.category,
    _id: { $ne: productData._id },
  }).limit(3);

  return (
    <div className="flex flex-col bg-black">
      <BottomInstagram />
      <NavBar />
      {productData && (
        <CartProvider>
          <ShowProductDetail
            similarProductsStringify={JSON.stringify(similarProducts)}
            productData={JSON.stringify(productData)}
          />
        </CartProvider>
      )}
      <Footer />
    </div>
  );
};

export default SingleCardPage;
