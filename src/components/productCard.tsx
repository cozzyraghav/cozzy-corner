'use client';
import { useCart } from '@/const/cartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ProductCard({
  id,
  name,
  images,
  rating,
  outOfStock,
  price,
  discountPrice,
}: any) {
  const { cart, addToCart, removeFromCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    // Check if the product is already in the cart
    setIsAdded(cart.some((item) => item.id === id));
  }, [cart, id]);

  function handleCartToggle(id: string) {
    if (outOfStock) return;
    if (isAdded) {
      removeFromCart(id);
      setIsAdded(false);
    } else {
      addToCart(id, 1);
      setIsAdded(true);
    }
  }

  return (
    <Link
      href={`/product/${id}`}
      className={`max-w-56 shrink-0 transform rounded-lg border border-gray-600 bg-neutral-950 p-2 shadow-lg transition-transform duration-300 hover:cursor-pointer md:max-w-none md:p-3`}
    >
      <div className="relative block h-44 w-full rounded-lg bg-white md:h-52">
        {/* <img
          src={}
          alt={name}
          className="block h-44 w-full rounded-lg bg-white object-contain md:h-52"
        /> */}
        <Image
          src={images[0]}
          alt={name}
          className="object-contain"
          fill={true}
        ></Image>
        {outOfStock && (
          <p className="absolute bottom-2 left-1 w-fit rounded-3xl border border-neutral-400 bg-neutral-800 px-2.5 py-1 text-center text-xs font-semibold text-neutral-200">
            Sold Out
          </p>
        )}
      </div>

      <div className="flex flex-col gap-0 py-4">
        {/* Name */}
        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-100 md:line-clamp-1 md:text-xl">
          {name}
        </h3>

        {/* Price and Discount */}
        <div>
          <span className="text-lg text-neon-blue line-through">₹{price}</span>
          <span className="ml-2 text-lg font-bold text-p-green">
            ₹{discountPrice}
          </span>
        </div>
      </div>
    </Link>
  );
}
