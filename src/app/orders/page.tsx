'use client';

import Footer from '@/components/footer';
import NavBar from '@/components/navBar';
import { Loader2Icon, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const Orders = () => {
  return (
    <div className="min-h-screen w-full bg-black">
      <NavBar />
      <ShowOrderData />
      <Footer />
    </div>
  );
};

const ShowOrderData = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  async function handleSearchForOrder() {
    setIsLoading(true);
    const response = await fetch('/api/getOrderDetailsByEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    if (response.status === 200) {
      const data = await response.json();
      setOrderData(data);
    } else if (response.status === 404) {
      setErrorMessage('No order found');
      setOrderData([]);
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }

    setIsLoading(false);
  }
  return (
    <div className="w-full">
      <form
        className="mx-auto mt-8 max-w-lg px-4"
        action="/api/orders"
        method="POST"
      >
        <input
          type="text"
          value={email}
          className="w-full rounded border border-neutral-700 bg-neutral-900 p-3 text-white focus:outline-none focus:ring-1 focus:ring-neutral-500"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div
          onClick={() => handleSearchForOrder()}
          className="mt-4 flex w-fit cursor-pointer items-center gap-2 rounded border border-neutral-700 px-3 py-2 text-white duration-200 hover:border-neutral-600"
        >
          {isLoading ? (
            <Loader2Icon className="animate-spin" size={20} />
          ) : (
            <Search size={20} />
          )}
          <p>Search Orders</p>
        </div>
      </form>

      {orderData.length > 0 && (
        <ListAllTheOrders orderDataString={JSON.stringify(orderData)} />
      )}
    </div>
  );
};

const ListAllTheOrders = ({ orderDataString }: any) => {
  const orderData = JSON.parse(orderDataString);
  return (
    <div className="hide-scrollbar mt-12 overflow-x-scroll px-4">
      <div className="mx-auto flex w-[72rem] flex-col">
        <div className="grid cursor-pointer grid-cols-12 gap-2 border border-neutral-700 bg-neutral-800 px-2 py-2 text-gray-100 md:mb-4">
          <div className="col-span-1 break-all">Index</div>
          <div className="col-span-3 break-all">Name</div>
          <div className="col-span-3 break-all">Email</div>
          <div className="col-span-3 break-all">Address</div>
          <div className="col-span-1 break-all">Amount</div>
          <div className="col-span-1 break-all">Status</div>
        </div>

        {orderData.map((item: any, index: number) => {
          return (
            <ListSingleProduct index={index} key={item._id} order={item} />
          );
        })}
      </div>
    </div>
  );
};

function ListSingleProduct({ order, index }: any) {
  const [showItems, setShowItems] = useState(false);
  return (
    <div className="flex flex-col">
      <div
        onClick={() => setShowItems((prev: any) => !prev)}
        className="grid cursor-pointer grid-cols-12 gap-2 border border-neutral-700 px-2 py-2 text-white"
      >
        <div className="col-span-1 break-all">{index + 1}</div>
        <div className="col-span-2 break-all">{order.name}</div>
        <div className="col-span-3 break-all">{order.email}</div>
        <div className="col-span-4 break-all">{order.address}</div>
        <div className="col-span-1 break-all">
          {(Number(order.discountedPrice) + Number(order.extraCharge)).toFixed(
            2
          )}
        </div>
        <div className="col-span-1 break-all capitalize">{order.status}</div>
      </div>

      {showItems && (
        <div className="flex flex-col border border-neutral-600 bg-neutral-800 text-white">
          {order.orderDetails.map((item: any, index: number) => {
            return (
              <div key={item._id} className="grid grid-cols-6 gap-2 px-2 py-2">
                <div className="col-span-1 flex max-w-24 items-center justify-between gap-1">
                  <p>{index + 1}</p>
                  <Image
                    src={item.image}
                    height={48}
                    width={48}
                    alt=""
                    className="rounded-sm"
                  />
                </div>
                <Link
                  href={'/product/' + item.productId}
                  target={'_blank'}
                  className="col-span-3 break-all hover:underline"
                >
                  {item.name}
                </Link>
                <div className="col-span-1 break-all text-right">
                  {item.price}
                </div>
                <div className="col-span-1 break-all text-right">
                  {item.quantity}
                </div>
              </div>
            );
          })}

          <div className="mt-4 flex flex-col">
            <div className="grid grid-cols-6 gap-2 border-t border-dashed border-neutral-700 px-2 py-1">
              <div className="col-span-1 flex justify-between gap-1">
                <p>Total Price</p>
              </div>
              <div className="col-span-3 break-all hover:underline"></div>
              <div className="col-span-1 break-all text-right">
                {'+ '}
                {Number(order.discountedPrice).toFixed(2)}
              </div>
              <div className="col-span-1 break-all"></div>
            </div>
            {Number(order.discountedPrice) - Number(order.totalAmount) !==
              0 && (
              <div className="grid grid-cols-6 gap-2 border-t border-dashed border-neutral-700 px-2 py-1">
                <div className="col-span-1 flex justify-between gap-1">
                  <p>Discount</p>
                </div>
                <div className="col-span-3 break-all hover:underline"></div>
                <div className="col-span-1 break-all text-right">
                  {(
                    Number(order.discountedPrice) - Number(order.totalAmount)
                  ).toFixed(2)}
                </div>
                <div className="col-span-1 break-all"></div>
              </div>
            )}
            <div className="grid grid-cols-6 gap-2 border-t border-dashed border-neutral-700 px-2 py-1">
              <div className="col-span-2 flex justify-between gap-1">
                {order.isGiftWrap ? (
                  <p>Extra Charges (delivery + gift Wrap)</p>
                ) : (
                  <p>Delivery charge</p>
                )}
              </div>
              <div className="col-span-2 break-all hover:underline"></div>
              <div className="col-span-1 break-all text-right">
                {'+ '}
                {Number(order.extraCharge).toFixed(2)}
              </div>
              <div className="col-span-1 break-all"></div>
            </div>
            {/* Only if there is any amount is paid online */}
            {order?.paymentAmount && (
              <div className="grid grid-cols-6 gap-2 border-t border-dashed border-gray-100 bg-white px-2 py-1">
                <div className="col-span-2 flex justify-between gap-1">
                  <p>Paid Online</p>
                </div>
                <div className="col-span-2 break-all hover:underline"></div>
                <div className="col-span-1 break-all text-right">
                  {Number(order?.paymentAmount).toFixed(2)}
                </div>
                <div className="col-span-1 break-all"></div>
              </div>
            )}
            <div className="grid grid-cols-6 gap-2 border-t border-dashed border-neutral-700 bg-neutral-700 px-2 py-1">
              <div className="col-span-1 flex justify-between gap-1">
                <p>Net Total</p>
              </div>
              <div className="col-span-3 break-all hover:underline"></div>
              <div className="col-span-1 break-all text-right">
                {''}
                {(
                  Number(order.discountedPrice) + Number(order.extraCharge)
                ).toFixed(2)}
              </div>
              <div className="col-span-1 break-all"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
