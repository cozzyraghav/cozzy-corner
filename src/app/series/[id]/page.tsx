import AnimeCardList from '@/components/animeCardList';
import BottomInstagram from '@/components/bottomInstagram';
import Footer from '@/components/footer';
import NavBar from '@/components/navBar';
import ProductCard from '@/components/productCard';
import { CartProvider } from '@/const/cartContext';
import connect from '@/dbConfig/dbConfig';
import Product from '@/Models/productModel';
import { Metadata } from 'next';
export async function generateMetadata(context: any): Promise<Metadata> {
  const params = context.params;
  const decodedCategory = decodeURIComponent(params.id);

  return {
    title: decodedCategory,
  };
}
export default async function Page(context: any) {
  const params = context.params;
  const decodedCategory = decodeURIComponent(params.id);

  await connect();
  const productsData = await Product.find({ series: decodedCategory });

  return (
    <div className="flex min-h-screen w-full flex-col bg-black">
      <BottomInstagram />
      <NavBar />

      <div className="mx-auto mt-12 flex w-full max-w-7xl flex-col justify-center gap-8">
        <div className="flex max-w-xl flex-col gap-4 px-8 text-5xl font-medium text-white">
          <p className="font-bold capitalize">{decodedCategory}</p>{' '}
        </div>
        <AnimeCardList productsDataStringify={JSON.stringify(productsData)} />
      </div>
      <Footer />
    </div>
  );
}
