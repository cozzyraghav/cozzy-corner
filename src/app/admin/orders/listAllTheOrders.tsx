'use client';

import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const ListAllTheOrders = ({ orderDataString }: any) => {
  const orderData = JSON.parse(orderDataString);
  return (
    <div className="mx-auto flex w-[72rem] flex-col px-4 md:px-0">
      <div className="my-4 flex flex-col">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded bg-red-300"></div>
          <p>Pending</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-2 rounded bg-yellow-300"></div>
          <p>Accepted</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-2 rounded bg-blue-300"></div>
          <p>Dispatched</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-2 rounded bg-green-300"></div>
          <p>Delivered</p>
        </div>
      </div>
      <div className="mb-4 grid cursor-pointer grid-cols-12 gap-2 border bg-gray-100 px-2 py-2">
        <div className="col-span-1 break-all">Index</div>
        <div className="col-span-2 break-all">Name</div>
        <div className="col-span-3 break-all">Email</div>
        <div className="col-span-3 break-all">Address</div>
        <div className="col-span-1 break-all">Pincode</div>
        <div className="col-span-1 break-all">Phone</div>
        <div className="col-span-1 break-all">Whatsapp</div>
      </div>

      {orderData.map((item: any, index: number) => {
        return <ListSingleProduct index={index} key={item._id} order={item} />;
      })}
    </div>
  );
};

function ListSingleProduct({ order, index }: any) {
  const [showItems, setShowItems] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function handleOrderStateChange(e: any) {
    setLoading(true);
    const status = e.target.value;
    if (ORDER_OPTIONS.includes(status)) {
      await fetch('/api/updateOrderState', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: order._id, status }),
      });
    }
    setLoading(false);
    router.refresh();
  }
  async function handleOrderDelete(id: string) {
    setLoading(true);
    await fetch('/api/deleteOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    setLoading(false);
    router.refresh();
  }
  const ORDER_OPTIONS = ['pending', 'accepted', 'dispatched', 'delivered'];

  function ValidateNumber(num: string) {
    const trimedNumber = num.replace(/\s+/g, '');
    if (trimedNumber.slice(0, 3) === '+91') {
      return trimedNumber.slice(3);
    } else {
      return trimedNumber;
    }
  }

  return (
    <div className="flex flex-col">
      <div
        onClick={() => setShowItems((prev: any) => !prev)}
        className={`grid cursor-pointer grid-cols-12 gap-2 border bg-gray-100 px-2 py-2 ${order.status === 'pending' && 'bg-red-50'} ${order.status === 'accepted' && 'bg-yellow-50'} ${order.status === 'dispatched' && 'bg-blue-50'} ${order.status === 'delivered' && 'bg-green-50'}`}
      >
        <div className="col-span-1 break-all">{index + 1}</div>
        <div className="col-span-2 break-all">{order.name}</div>
        <div className="col-span-3 break-all">{order.email}</div>
        <div className="col-span-3 break-all">{order.address}</div>
        <div className="col-span-1 break-all">{order.pincode}</div>
        <div className="col-span-1 break-all">{order.phone}</div>
        <Link
          target="_blank"
          href={`https://wa.me/${ValidateNumber(order.phone)}?text=Hi%20${order.name}%0AThank%20you%20for%20placing%20an%20order%20with%20us%20at%20http://cozzycorner.in%20We%20just%20wanted%20to%20confirm%20your%20order%20and%20check%20if%20there%E2%80%99s%20anything%20else%20you%E2%80%99d%20like%20to%20add%20before%20we%20proceed.%20If%20you%20need%20help%20or%20have%20any%20questions,%20feel%20free%20to%20reach%20out.%20Thank%20you!`}
        >
          <Image
            width={28}
            height={28}
            className="cursor-pointer rounded-xl bg-green-700 p-1 duration-200 hover:scale-105"
            src="https://s3.ap-south-1.amazonaws.com/cozzy.corner/whatsapp-icon.png"
            alt=""
          />
        </Link>
      </div>

      {showItems && (
        <div className="flex flex-col border">
          <div
            className={`flex justify-between gap-6 border-b border-gray-300 px-2 py-2 ${loading && 'pointer-events-none opacity-40'}`}
          >
            <div
              onClick={() => handleOrderDelete(order._id)}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-1 text-center text-white duration-200 hover:bg-red-700"
            >
              <Trash2 size={18} />
              <p>Delete</p>
            </div>
            <select
              onChange={(e) => handleOrderStateChange(e)}
              className="rounded-md border border-gray-300 px-2 py-1.5 outline-none"
              name="stateOfOrder"
              value={order.status}
            >
              <option value="">State of order</option>
              {ORDER_OPTIONS.map((series) => (
                <option key={series} value={series}>
                  {series.charAt(0).toUpperCase() + series.slice(1)}
                </option>
              ))}
            </select>
          </div>
          {order.orderDetails.map((item: any, index: number) => {
            return (
              <div
                key={item._id}
                className="grid grid-cols-6 gap-2 bg-white px-2 py-2"
              >
                <div className="col-span-1 flex max-w-24 items-center justify-between gap-1">
                  <p>{index + 1}</p>
                  <div className="relative size-8 overflow-hidden">
                    <Image
                      src={item.image}
                      fill={true}
                      className="h-full w-full object-contain"
                      alt=""
                    />
                  </div>
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
            <div>
              {/* If it is a gift wrap */}
              {order.isGiftWrap && (
                <p className="px-2 py-1 text-green-600 underline underline-offset-2">
                  It is a gift wrap
                </p>
              )}
            </div>
            <div className="grid grid-cols-6 gap-2 border-t border-dashed border-gray-100 bg-white px-2 py-1">
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
            {order?.couponApplied && (
              <div className="grid grid-cols-6 gap-2 border-t border-dashed border-gray-100 bg-white px-2 py-1">
                <div className="col-span-1 flex justify-between gap-1">
                  <p>Coupon Code</p>
                </div>
                <div className="col-span-3 break-all hover:underline"></div>
                <div className="col-span-1 break-all text-right">
                  {order?.couponCode}
                </div>
                <div className="col-span-1 break-all"></div>
              </div>
            )}
            {Number(order.discountedPrice) - Number(order.totalAmount) !==
              0 && (
              <div className="grid grid-cols-6 gap-2 border-t border-dashed border-gray-100 bg-white px-2 py-1">
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
            <div className="grid grid-cols-6 gap-2 border-t border-dashed border-gray-100 bg-white px-2 py-1">
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

            <div className="grid grid-cols-6 gap-2 border-t border-dashed border-gray-100 bg-green-100 px-2 py-1">
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

export default ListAllTheOrders;
