import Footer from '@/components/footer';
import NavBar from '@/components/navBar';
import ShowProductData from './showProductData';

const SearchProduct = () => {
  return (
    <div className="min-h-screen w-full bg-black">
      <NavBar />
      <ShowProductData />
      <Footer />
    </div>
  );
};

export default SearchProduct;
