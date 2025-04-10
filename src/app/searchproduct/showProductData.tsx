'use client';

import ProductCard from '@/components/productCard';
import { CartProvider } from '@/const/cartContext';
import { Loader2Icon, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

const ShowProductData = () => {
  const [searchName, setSearchName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showProducts, setShowProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (searchName === '') {
      setShowProducts([]);
      return;
    }
    if (typeof window === 'undefined') return;
    const timer = setTimeout(() => {
      async function getProductData() {
        setIsLoading(true);
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ searchName }),
        });
        if (response.status === 200) {
          const data = await response.json();
          setErrorMessage('');
          setShowProducts(data);
          setIsLoading(false);
        } else if (response.status === 404) {
          setErrorMessage('No product found');
          setShowProducts([]);
          setTimeout(() => {
            setErrorMessage('');
          }, 800);
        }
        setIsLoading(false);
      }

      getProductData();
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchName]);

  async function handleSearchForProducts() {
    setIsLoading(true);
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ searchName }),
    });
    if (response.status === 200) {
      const data = await response.json();
      setErrorMessage('');
      setShowProducts(data);
      setIsLoading(false);
    } else if (response.status === 404) {
      setErrorMessage('No product found');
      setShowProducts([]);
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
    setIsLoading(false);
  }

  return (
    <div className="w-full">
      <form className="mx-auto mt-8 max-w-lg px-4">
        <input
          type="text"
          value={searchName}
          className="w-full rounded border border-neutral-700 bg-neutral-800 p-3 text-white focus:outline-none focus:ring-1 focus:ring-neutral-500"
          placeholder="Enter product name"
          onChange={(e) => setSearchName(e.target.value)}
        />

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div
          onClick={() => handleSearchForProducts()}
          className="mt-4 flex w-fit cursor-pointer items-center gap-2 rounded border border-neutral-700 px-3 py-2 text-white duration-200 hover:border-neutral-600"
        >
          {isLoading ? (
            <Loader2Icon className="animate-spin" size={20} />
          ) : (
            <Search size={20} />
          )}
          <p>Search Product</p>
        </div>
      </form>
      {showProducts.length > 0 && (
        <AnimeCardList productsData={JSON.stringify(showProducts)} />
      )}
    </div>
  );
};

const AnimeCardList = ({ productsData }: { productsData: any }) => {
  const showProductData = JSON.parse(productsData);
  return (
    <CartProvider>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {showProductData.map((character: any, index: number) => (
          <ProductCard
            key={index}
            _id={character._id}
            id={character.id}
            name={character.name}
            images={character.images}
            price={character.price}
            discountPrice={character.discountPrice}
            outOfStock={character.outOfStock}
          />
        ))}
      </div>
    </CartProvider>
  );
};

export default ShowProductData;
