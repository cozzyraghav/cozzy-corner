'use client';
import { useState, useEffect } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { cartState } from '@/const/cartState';
import Image from 'next/image';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const ShowCartData = () => {
  // State about coupon
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const [amountPayableOnline, setAmountPayableOnline] = useState(60);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCOD, setIsCOD] = useState(true); // True because the amountPayableOnline is 50 by default
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  // const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    mobile: '',
    pincode: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    transactionId: '',
  });

  // code for loading razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const [cart, setCart] = useRecoilState(cartState);

  useEffect(() => {
    const fetchCartProducts = async () => {
      const parsedCart = cart ? JSON.parse(cart) : [];
      const productIds = parsedCart.map((item: any) => item.id);

      if (productIds.length > 0) {
        try {
          const response = await axios.post('/api/products', {
            ids: productIds,
          });
          const products = response.data;
          const updatedCartItems = parsedCart.map((cartItem: any) => {
            const product = products.find(
              (prod: any) => prod.id === cartItem.id
            );
            return { ...product, quantity: cartItem.quantity };
          });
          setCartItems(updatedCartItems);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      }
      setLoading(false);
    };

    fetchCartProducts();
  }, []);

  useEffect(() => {
    setCart(JSON.stringify(cartItems));
  }, [cartItems]);

  const increaseQuantity = (id: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.discountPrice * item.quantity,
    0
  );

  // Delivery charge calculation
  const deliveryCharge = subtotal <= 1199 ? 60 : 0;

  // Extra 10% discount if subtotal is 1999 or more
  // const extraDiscount = subtotal > 1999 ? 10 : 0;
  const extraDiscount = 0;
  // const effectiveDiscount = discount + extraDiscount;
  const effectiveDiscount = extraDiscount;
  const discountAmount = (subtotal * effectiveDiscount) / 100;

  const total =
    subtotal - discountAmount + deliveryCharge + (isGiftWrap ? 40 : 0);

  interface PaymentDetails {
    ammount: number;
    orderId: string;
    status: string;
  }

  async function handlePlaceOrder(e: any) {
    e.preventDefault();

    if (total < 299) {
      alert('Minimum order amount is ₹299.');
      return;
    }
    // Loading raqorpay script before rendring
    const scriptLoaded = await loadRazorpayScript();
    const onlinePaymentAmmount = amountPayableOnline;
    let paymentDetail: PaymentDetails = {
      ammount: onlinePaymentAmmount,
      orderId: '',
      status: '',
    };
    try {
      // Create an order by calling your backend
      const response = await fetch('/api/create-order-razorpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ onlinePaymentAmmount }),
      });
      const data = await response.json();
      paymentDetail.orderId = data.orderId;
      const options = {
        key: process.env.NEXT_PUBLIC_KEY_ID,
        amount: onlinePaymentAmmount * 100,
        currency: 'INR',
        name: 'Cozzy Corner',
        description: 'Test Transaction',
        order_id: data.orderId,
        handler: async function (response: any) {
          try {
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();
            if (verifyData.status === 'success') {
              paymentDetail.status = 'success';
              // Placing the order after successful payment
              handleOrderSubmit(paymentDetail);
            } else {
              paymentDetail.status = 'failure';
            }
          } catch (error) {
            console.error('Verification Error:', error);
            paymentDetail.status = 'verificationError';
          }
        },
        modal: {
          ondismiss: function () {
            console.log('Payment cancelled');
            paymentDetail.status = 'cancelled';
          },
        },
      };

      const rzpay = new window.Razorpay(options);
      rzpay.open();
    } catch (error) {
      console.error('Payment Error:', error);
      paymentDetail.status = 'paymentError';
    }
    // console.log('payment detail is: ' + JSON.stringify(paymentDetail));
  }

  async function handleOrderSubmit(paymentDetail: PaymentDetails) {
    const orderData = {
      user: {
        ...userDetails,
        address:
          `${userDetails.addressLine1}, ${userDetails.addressLine2}, ${userDetails.landmark}`.trim(),
      },
      items: cartItems || [],
      total,
      isCOD,
      isGiftWrap,
      couponApplied,
      couponInput,
      paymentStatus: paymentDetail.status,
      paymentAmount: paymentDetail.ammount,
      paymentOrderID: paymentDetail.orderId,
    };

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        scrollTo({ top: 0, behavior: 'smooth' });
        setCart('');
        setCartItems([]);
        setUserDetails({
          name: '',
          email: '',
          mobile: '',
          pincode: '',
          addressLine1: '',
          addressLine2: '',
          landmark: '',
          transactionId: '',
        });
        setAmountPayableOnline(60);
        setIsCOD(false);
        setShowCheckoutForm(false);
        setIsOrderPlaced(true);
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  }

  function handleCouponApply(value: any) {
    if (value === 'AAY10') {
      if (total < 2000) {
        setCouponMsg('Minimum order amount for coupon is ₹2000');
        return;
      }
      setCouponMsg('10% Discount Applied');
      setCouponApplied(true);
    } else {
      setCouponMsg('Invalid Coupon');
    }
  }

  if (loading) {
    return (
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 p-4">
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        <div className="animate-pulse rounded-lg bg-neutral-900 py-20 text-white md:py-24"></div>
        ;
        <div className="animate-pulse rounded-lg bg-neutral-900 py-20 text-white md:py-24"></div>
        ;
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-16">
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <section className="mx-auto max-w-7xl p-4">
        <h1 className="mb-8 text-4xl font-semibold text-gray-100">
          Shopping Cart
        </h1>
        {isOrderPlaced && (
          <div className="flex flex-col gap-1">
            <p className="text-green-400"> Your Order is Placed.</p>
            <Link
              className="mb-2 text-blue-500 underline duration-200 hover:text-blue-600"
              href="/orders"
            >
              Visit Order page
            </Link>
          </div>
        )}

        <div className="mb-8 rounded-lg bg-neutral-900 p-4">
          {cartItems.length === 0 ? (
            <p className="text-white">Your cart is empty.</p>
          ) : (
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-1 font-bold text-white">Product</div>
              <div className="col-span-1 text-right font-bold text-white">
                Quantity
              </div>
              <div className="col-span-1 text-right font-bold text-white">
                Price
              </div>
              <div className="col-span-1 text-right font-bold text-white">
                Remove
              </div>

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="subgrid col-span-4 grid grid-cols-4 border-b border-gray-400 py-4"
                >
                  <div className="col-span-1 flex w-full flex-col gap-3 md:flex-row md:items-center md:space-x-4">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-lg md:size-20">
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill={true}
                        className="rounded object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="line-clamp-2 text-sm text-white md:text-lg">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  <div className="col-span-1 flex h-fit items-center justify-end gap-2 md:gap-4">
                    <button
                      className="flex items-center justify-center rounded-lg bg-neon-blue px-1.5 py-1.5 text-white md:px-3 md:py-2.5"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      <Minus size={18} />
                    </button>
                    <span className="text-white">{item.quantity}</span>
                    <button
                      className="flex items-center justify-center rounded-lg bg-neon-blue px-1.5 py-1.5 text-white md:px-3 md:py-2.5"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <div className="col-span-1 text-right text-lg text-p-green">
                    ₹{(item.discountPrice * item.quantity).toFixed(2)}
                  </div>

                  <div className="col-span-1 text-right">
                    <button
                      className="ml-auto flex items-center gap-2 rounded-lg bg-red-600 px-2 py-2 text-white transition duration-300 hover:bg-red-700 md:px-4 md:py-2"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={18} />
                      <p className="hidden md:block">Remove</p>
                    </button>
                  </div>
                </div>
              ))}
              <div className="col-span-4">
                <div className="mb-4 flex items-center space-x-3 rounded-lg p-4">
                  <input
                    type="checkbox"
                    id="giftWrap"
                    className="mr-2 h-5 w-5 rounded border-gray-300 text-green-500 focus:ring-0"
                    checked={isGiftWrap}
                    onChange={() => setIsGiftWrap(!isGiftWrap)}
                  />
                  <label
                    htmlFor="giftWrap"
                    className="text-sm font-medium text-white"
                  >
                    Add Gift Wrap <span className="text-green-400">(₹40)</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="my-6 flex flex-col rounded-lg bg-dark-gray p-4">
            <h2 className="mb-4 text-2xl font-semibold text-gray-100">
              Apply coupon
            </h2>

            <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Enter coupon code"
              className="mb-1 w-fit rounded-lg border border-neutral-600 bg-neutral-900 px-4 py-2 text-white ring-neutral-500 focus:outline-none focus:ring-1"
            />
            <p className="mb-2 text-gray-300">{couponMsg}</p>

            <button
              className="w-fit rounded-lg bg-p-green px-4 py-2 text-white transition duration-300 hover:bg-p-green/90"
              onClick={() => handleCouponApply(couponInput)}
            >
              Apply Coupon
            </button>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="rounded-lg bg-dark-gray p-4">
            <h2 className="mb-4 text-2xl font-semibold text-gray-100">
              Cart Summary
            </h2>
            <div className="mb-4 flex justify-between text-white">
              <p>Subtotal:</p>
              <p>₹{subtotal.toFixed(2)}</p>
            </div>
            {extraDiscount > 0 && (
              <div className="mb-4 flex justify-between text-neon-green">
                <p>Additional Discount (10%):</p>
                <p>-₹{((subtotal * extraDiscount) / 100).toFixed(2)}</p>
              </div>
            )}

            {deliveryCharge > 0 && (
              <div className="mb-4 flex justify-between text-white">
                <p>Delivery Charge:</p>
                <p>₹{deliveryCharge.toFixed(2)}</p>
              </div>
            )}
            {isGiftWrap && (
              <div className="mb-4 flex justify-between text-white">
                <p>Gift Wraping Charge:</p>
                <p>₹40</p>
              </div>
            )}
            {couponApplied && (
              <div className="mb-4 flex justify-between text-white">
                <p>Coupon Discount:</p>
                <p>₹{(total / 10).toFixed(2)}</p>
              </div>
            )}
            <div className="mb-4 flex justify-between text-white">
              <p>Total:</p>
              <p>
                ₹
                {couponApplied
                  ? (total - total / 10).toFixed(2)
                  : total.toFixed(2)}
              </p>
            </div>
            <button
              className="rounded-lg bg-p-green px-4 py-2 text-white transition duration-300 hover:bg-p-green/90"
              onClick={() => setShowCheckoutForm(true)}
            >
              Proceed to Checkout
            </button>
          </div>
        )}

        {showCheckoutForm && (
          <form
            className="mt-8 rounded-lg bg-neutral-900 p-4"
            onSubmit={handlePlaceOrder}
          >
            <h2 className="mb-4 text-2xl font-semibold text-white">Checkout</h2>
            <p className="mb-1 text-white">Name</p>
            <input
              type="text"
              placeholder="John Doe"
              className="mb-4 w-full rounded-lg border border-gray-400 bg-transparent px-4 py-2 text-white focus:outline-none"
              value={userDetails.name}
              onChange={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
              }
              required
            />
            <p className="mb-1 text-white">Email</p>

            <input
              type="email"
              placeholder="mail.email.com"
              className="mb-4 w-full rounded-lg border border-gray-400 bg-transparent px-4 py-2 text-white focus:outline-none"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              required
            />
            <p className="mb-1 text-white">Mobile Number</p>

            <input
              type="tel"
              placeholder="+91 1234567890"
              className="mb-4 w-full rounded-lg border border-gray-400 bg-transparent px-4 py-2 text-white focus:outline-none"
              value={userDetails.mobile}
              onChange={(e) =>
                setUserDetails({ ...userDetails, mobile: e.target.value })
              }
              required
            />
            <p className="mb-1 text-white">Pin Code</p>

            <input
              type="text"
              placeholder="123456"
              className="mb-4 w-full rounded-lg border border-gray-400 bg-transparent px-4 py-2 text-white focus:outline-none"
              value={userDetails.pincode}
              onChange={(e) =>
                setUserDetails({ ...userDetails, pincode: e.target.value })
              }
              required
            />
            <p className="mb-1 text-white">Address Line 1</p>

            <input
              type="text"
              placeholder="Address Line 1"
              className="mb-4 w-full rounded-lg border border-gray-400 bg-transparent px-4 py-2 text-white"
              value={userDetails.addressLine1}
              onChange={(e) =>
                setUserDetails({ ...userDetails, addressLine1: e.target.value })
              }
              required
            />
            <p className="mb-1 text-white">Address Line 2</p>
            <input
              type="text"
              placeholder="Address Line 2"
              className="mb-4 w-full rounded-lg border border-gray-400 bg-transparent px-4 py-2 text-white"
              value={userDetails.addressLine2}
              onChange={(e) =>
                setUserDetails({ ...userDetails, addressLine2: e.target.value })
              }
              required
            />
            <p className="mb-1 text-white">Landmark (Optional)</p>
            <input
              type="text"
              placeholder="Landmark (Optional)"
              className="mb-4 w-full rounded-lg border border-gray-400 bg-transparent px-4 py-2 text-white"
              value={userDetails.landmark}
              onChange={(e) =>
                setUserDetails({ ...userDetails, landmark: e.target.value })
              }
            />
            <PaymentMethod
              isCOD={isCOD}
              total={total}
              couponApplied={couponApplied}
              setIsCOD={setIsCOD}
              setAmountPayableOnline={setAmountPayableOnline}
            />
            <button
              type="submit"
              className="rounded-lg bg-p-green px-4 py-2 text-white transition duration-300 hover:bg-p-green/90"
            >
              Place Order
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export default ShowCartData;
function PaymentMethod({
  setAmountPayableOnline,
  total,
  isCOD,
  setIsCOD,
  couponApplied,
}: any) {
  return (
    <div className="mb-4 text-white">
      <h2 className="mb-2 text-lg font-semibold">Select Payment Method</h2>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
        <label className="flex cursor-pointer select-none items-center space-x-2 border border-neutral-700 p-2">
          <input
            type="radio"
            name="paymentMethod"
            value="COD"
            checked={isCOD}
            onChange={() => {
              setIsCOD(true);
              setAmountPayableOnline(60);
            }}
            className="h-4 w-4 text-green-500 focus:ring-0"
          />
          <span>Cash on Delivery (COD)</span>
        </label>
        <label className="flex cursor-pointer select-none items-center space-x-2 border border-neutral-700 p-2">
          <input
            type="radio"
            name="paymentMethod"
            value="Online"
            checked={!isCOD}
            onChange={() => {
              setIsCOD(false);
              setAmountPayableOnline(
                couponApplied ? (total - total / 10).toFixed(2) : total
              );
            }}
            className="h-4 w-4 text-green-500 focus:ring-0"
          />
          <span>Online Payment</span>
        </label>
      </div>

      {isCOD ? (
        <div className="">
          <p className="text-green-500">Pay Rs.60 (COD charge) online.</p>
          <p>
            Amount to be payable on delivery is -{' '}
            {couponApplied ? (total - 60 - total / 10).toFixed(2) : total - 60}
          </p>
        </div>
      ) : (
        <div className="">
          <p className="text-green-500">
            Pay Rs. {couponApplied ? (total - total / 10).toFixed(2) : total}
            online {total < 1999 && '(Including Rs.60 of delivery charges)'}
          </p>
        </div>
        // ) : (
        //   <div className="">
        //     <p className="text-green-500">
        //       Pay Rs.{' '}
        //       {couponApplied ? (total - total / 10).toFixed(2) + 50 : total + 50}
        //       online {total < 1999 && '(+50 Delivery charge)'}
        //     </p>
        //   </div>
      )}
    </div>
  );
}
