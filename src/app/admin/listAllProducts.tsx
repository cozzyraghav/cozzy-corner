'use client';

import { Blocks, EllipsisVertical, Flame, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const ListAllProducts = ({ productData }: any) => {
  const [showProducts, setShowProducts] = useState(true);
  const products = JSON.parse(productData);
  const router = useRouter();

  async function handleOutOfStock(id: any) {
    const data = await fetch('/api/outOfStock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (data.ok) {
      router.refresh();
    }
  }
  async function handleHotDealProduct(id: any) {
    const data = await fetch('/api/hotDeal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (data.ok) {
      router.refresh();
    }
  }

  async function handleDelete(id: any) {
    const data = await fetch('/api/deleteProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (data.ok) {
      router.refresh();
    }
  }

  return (
    <div className="mx-auto flex w-[72rem] flex-col gap-6">
      <div className="flex gap-4 py-4">
        <div
          onClick={() => setShowProducts(!showProducts)}
          className="w-fit cursor-pointer select-none rounded bg-blue-300 px-3 py-2 font-medium text-blue-800"
        >
          Toggle Products
        </div>
        <Link
          href="/admin/addProduct"
          className="w-fit cursor-pointer select-none rounded bg-green-300 px-3 py-2 font-medium text-green-800"
        >
          Add new
        </Link>
        <Link
          href="/admin/orders"
          className="w-fit cursor-pointer select-none rounded bg-yellow-300 px-3 py-2 font-medium text-yellow-800"
        >
          Orders
        </Link>
      </div>
      <p className="text-3xl font-semibold">Products</p>
      {showProducts && (
        <div className="hide-scrollbar mx-auto flex w-full flex-col overflow-x-scroll">
          {products.map((product: any, index: number) => {
            return (
              <div
                className={`grid grid-cols-10 gap-2 border px-2 py-1 ${product?.outOfStock && 'bg-red-300'} `}
              >
                <div className="col-span-1 flex items-center justify-between gap-1">
                  <p>{index + 1}</p>
                  <div className="relative size-12 overflow-hidden">
                    <Image
                      fill={true}
                      src={product.images[0]}
                      className="h-full w-full object-contain"
                      alt=""
                    />
                  </div>
                </div>

                <p className="col-span-3 flex items-center">{product.name}</p>
                <p className="self-center">{product.price}</p>
                <p className="self-center">{product.discountPrice}</p>
                <p className="self-center">{product.category}</p>
                <p className="self-center">{product.series}</p>
                <p className="flex items-center gap-3">
                  <Pencil
                    onClick={() =>
                      router.push(`/admin/editExistingProduct/${product.id}`)
                    }
                    className="cursor-pointer text-gray-600 duration-200 hover:scale-110 hover:text-gray-800"
                    size={20}
                  />
                  <Trash2
                    onClick={() => handleDelete(product.id)}
                    className="cursor-pointer text-gray-600 duration-200 hover:scale-110 hover:text-gray-800"
                    size={20}
                  />
                  <Blocks
                    onClick={() => handleOutOfStock(product.id)}
                    className="cursor-pointer text-gray-600 duration-200 hover:scale-110 hover:text-gray-800"
                    size={20}
                  />
                  <Flame
                    onClick={() => handleHotDealProduct(product.id)}
                    className={`cursor-pointer text-gray-600 duration-200 hover:scale-110 hover:text-gray-800 ${product.isHotDeal && 'fill-red-500 stroke-red-700'}`}
                    size={20}
                  />
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ListAllProducts;
