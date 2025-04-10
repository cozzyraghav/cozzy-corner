import ProductCard from '@/components/productCard';
import { CartProvider } from '@/const/cartContext';
import React from 'react';

const HotDeals = ({ productsData }: any) => {
  return (
    <div>
      <div className="bg-black text-white">
        <div className="container mx-auto flex flex-col gap-3 py-4 md:gap-6 md:py-8">
          <h1 className="text-center text-3xl font-semibold text-gray-200 md:text-5xl">
            Hot Deals of the Month
          </h1>
          {/* <p className="mx-auto max-w-[80%] text-center text-gray-400">
            Grab the best deals while they last! These products are available at
            <br />
            unbeatable prices—hurry before they're gone!
          </p> */}
          {/* <CartDataProvider> */}
          <AnimeCardList productsData={productsData} />
          {/* </CartDataProvider> */}
        </div>
      </div>
    </div>
  );
};

export default HotDeals;

const AnimeCardList = ({ productsData }: { productsData: any }) => {
  const showProductData = JSON.parse(productsData);
  return (
    <CartProvider>
      {/* <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-2 gap-y-4 px-4 py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"> */}
      <div className="mx-auto flex w-full max-w-7xl grid-cols-2 gap-6 overflow-x-scroll p-8 md:grid md:grid-cols-4 md:overflow-x-auto">
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
