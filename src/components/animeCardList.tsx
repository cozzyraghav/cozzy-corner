'use client';
import ProductCard from '@/components/productCard';
import { CartProvider } from '@/const/cartContext';
import { useEffect, useState } from 'react';

const AnimeCardList = ({ productsDataStringify }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const productsData = JSON.parse(productsDataStringify);
  useEffect(() => {
    setIsLoading(false);
  }, []);
  if (isLoading) {
    return (
      <div className="mx-auto h-96 w-full max-w-7xl px-4">
        <div className="h-full w-full animate-pulse rounded bg-neutral-900"></div>
      </div>
    );
  }
  return (
    <CartProvider>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-2 gap-y-4 px-4 py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productsData.map((character: any, index: number) => (
          <ProductCard
            key={character.id}
            id={character.id}
            name={character.name}
            images={character.images}
            rating={character.rating}
            outOfStock={character.outOfStock}
            price={character.price}
            discountPrice={character.discountPrice}
          />
        ))}
      </div>
    </CartProvider>
  );
};

export default AnimeCardList;
