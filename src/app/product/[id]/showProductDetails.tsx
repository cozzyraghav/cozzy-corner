'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CartProvider } from '@/const/cartContext';
import ProductCard from '@/components/productCard';
import { useRecoilState } from 'recoil';
import { cartState } from '@/const/cartState';
import Image from 'next/image';
const ShowProductDetail = ({ productData, similarProductsStringify }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [inCart, setInCart] = useState(false);
  const [cart, setCart] = useRecoilState(cartState);
  const router = useRouter();
  const parsedProductData = productData ? JSON.parse(productData) : {};
  const similarProducts = similarProductsStringify
    ? JSON.parse(similarProductsStringify)
    : [];

  const {
    name,
    images,
    price,
    discountPrice,
    outOfStock,
    description,
    productHeadlines,
    id,
  } = parsedProductData;

  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImage(images[0]);
    }
    setIsLoading(false);
  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined' && cart) {
      const parsedCart = cart ? JSON.parse(cart) : [];
      const productInCart = parsedCart.some((item: any) => item.id === id);
      setInCart(productInCart);
    }
  }, [id, cart]);

  const toggleCart = () => {
    if (outOfStock) return;

    let parsedCart = cart ? JSON.parse(cart) : [];
    const alreadyInCart = parsedCart.some((item: any) => item.id === id);

    if (alreadyInCart) {
      parsedCart = parsedCart.filter((item: any) => item.id !== id);
      setInCart(false);
    } else {
      parsedCart.push({ id, quantity: 1 });
      setInCart(true);
    }
    setCart(JSON.stringify(parsedCart));
  };

  const handleBuyNow = () => {
    if (outOfStock) return;

    setCart(JSON.stringify([{ id, quantity: 1 }]));
    router.push('/cart');
  };

  if (isLoading) {
    return (
      <div className="mx-auto h-96 w-full max-w-7xl px-4">
        <div className="h-full w-full animate-pulse rounded bg-neutral-900"></div>
      </div>
    );
  }

  return (
    <div className="bg-black py-16">
      <section className="mx-auto max-w-7xl">
        <div className="container mx-auto flex flex-col items-start gap-8 md:flex-row">
          {/* Sticky Image Section */}
          <div className="top-16 flex w-full flex-col-reverse items-center gap-4 p-4 md:sticky md:w-auto md:flex-row">
            <div className="flex flex-row items-center gap-2 md:flex-col">
              {/* Thumbnails Section */}
              {images?.map((image: string, index: number) => (
                <Image
                  key={index}
                  src={image}
                  width={164}
                  height={164}
                  alt={`Thumbnail ${index + 1}`}
                  className={`h-16 w-16 cursor-pointer rounded-lg object-cover ${
                    selectedImage === image ? 'border-4 border-p-green' : ''
                  }`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>

            {/* Main Image Display */}
            <div className="relative h-80 w-80 md:h-96 md:w-96">
              {selectedImage && (
                <Image
                  src={selectedImage}
                  fill={true}
                  alt="Selected Product"
                  className="h-full w-full rounded-lg object-cover shadow-lg"
                />
              )}
            </div>
          </div>

          {/* Scrollable Right Section */}
          <div className="space-y-12 px-4 md:ml-8 md:w-1/2 md:px-0">
            {/* Product Details */}
            <div>
              <h1 className="mb-6 text-3xl font-bold text-gray-200 md:text-5xl">
                {name}
              </h1>

              <div className="mb-4 flex items-center space-x-4">
                <span className="text-xl text-neon-blue line-through">
                  ₹{price}
                </span>
                <span className="text-2xl font-bold text-neon-green">
                  ₹{discountPrice}
                </span>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleBuyNow} // Handle Buy Now click
                  className={`rounded bg-p-green px-8 py-2 font-semibold text-white transition duration-300 hover:bg-p-green/90 ${outOfStock ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                  Buy now
                </button>
                <button
                  onClick={toggleCart}
                  className={`rounded border border-p-blue px-8 py-2 text-white transition duration-300 hover:bg-p-blue/90 ${outOfStock ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                  {outOfStock
                    ? 'Out of stock'
                    : inCart
                      ? 'Remove from cart'
                      : 'Add to cart'}
                </button>
              </div>
            </div>

            <p className="mb-4 text-lg text-gray-300">{description}</p>

            {/* Product Highlights */}
            <div className="rounded-lg py-4">
              <h2 className="mb-4 text-2xl font-semibold text-gray-100">
                Product Highlights
              </h2>
              <ul className="list-disc space-y-2 pl-5 text-white">
                {productHeadlines?.map((headline: string, index: number) => (
                  <li key={index}>{headline}</li>
                ))}
              </ul>
            </div>
            <CartProvider>
              <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-2 gap-y-4 py-8 sm:grid-cols-2 md:grid-cols-3">
                {similarProducts.map((character: any, index: number) => (
                  <ProductCard
                    key={character.id}
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShowProductDetail;
