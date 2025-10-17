"use client";
import NavBar from "@/components/navBar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { convertS3ToImageKit } from "@/helper/imagekit";
import { useStore } from "@/helper/store/zustand";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Page = () => {
  const { productStore, emptyCart } = useStore();

  const GIFT_WRAP_CHARGES = 40;
  const [isGiftWrap, setIsGiftWrap] = useState(false);

  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [couponError, setCouponError] = useState("");
  const cartTotal = productStore.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const applyCoupon = (code: string) => {
    const coupon = COUPONS.find((c) => c.code === code.toUpperCase());
    if (!coupon) {
      setCouponError("Invalid coupon code.");
      setAppliedCoupon("");
      return;
    }

    if (cartTotal < coupon.minAmount) {
      setCouponError(
        `Minimum cart amount of ₹${coupon.minAmount} required for ${code}`
      );
      setAppliedCoupon("");
      return;
    }

    setCouponError("");
    setAppliedCoupon(code.toUpperCase());
  };

  const getDiscountedTotal = () => {
    const coupon = COUPONS.find((c) => c.code === appliedCoupon);
    const discount = coupon ? (cartTotal * coupon.discountPercent) / 100 : 0;
    return discount;
  };

  function getUserTotalToPay() {
    console.log(getDiscountedTotal());
    const finalAmount = isCOD
      ? cod_charge.extraFees +
        (cod_charge.depositPercentage / 100) *
          (cartTotal - getDiscountedTotal())
      : cartTotal - getDiscountedTotal();

    return (
      finalAmount +
      getGiftWrapCharges() +
      getDeliveryCharges() +
      getTaxes()
    ).toFixed(2);
  }

  function getCartTotal() {
    return cartTotal;
  }

  function getTaxes() {
    return 0;
  }

  function getDeliveryCharges() {
    return getDiscountedTotal() >= MINIMUM_AMOUNT_FOR_FREE_DELIVERY
      ? 0
      : DELIVERY_CHARGES;
  }

  function getGiftWrapCharges() {
    return isGiftWrap ? GIFT_WRAP_CHARGES : 0;
  }

  const [isCOD, setIsCOD] = useState(false);

  function getUserTotalToPayonDelivery() {
    const amount = isCOD
      ? ((100 - cod_charge.depositPercentage) / 100) *
        (cartTotal - getDiscountedTotal())
      : 0;
    return amount.toFixed(2);
  }

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  const [couponInput, setCouponInput] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  // const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    mobile: "",
    pincode: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    transactionId: "",
  });

  // code for loading razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const finalTotal =
    getDiscountedTotal() + getDeliveryCharges() + (isGiftWrap ? 40 : 0);

  interface PaymentDetails {
    ammount: number;
    orderId: string;
    status: string;
  }

  async function handlePlaceOrder(e: any) {
    e.preventDefault();
    // if (
    //   !userDetails.name ||
    //   !userDetails.email ||
    //   !userDetails.mobile ||
    //   !userDetails.pincode ||
    //   !userDetails.addressLine1 ||
    //   !userDetails.addressLine2 ||
    //   !userDetails.landmark
    // ) {
    //   alert("Please fill all the details");
    //   return;
    // }

    // if (finalTotal < 299) {
    //   alert("Minimum order amount is ₹299.");
    //   return;
    // }
    // Loading raqorpay script before rendring
    await loadRazorpayScript();

    const onlinePaymentAmmount = Number(getUserTotalToPay());

    let paymentDetail: PaymentDetails = {
      ammount: onlinePaymentAmmount,
      orderId: "",
      status: "",
    };
    try {
      // Create an order by calling your backend
      const response = await fetch("/api/create-order-razorpay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ onlinePaymentAmmount }),
      });
      const data = await response.json();

      paymentDetail.orderId = data.orderId;

      const options = {
        key: process.env.NEXT_PUBLIC_KEY_ID,
        amount: onlinePaymentAmmount * 100,
        currency: "INR",
        name: "Cozzy Corner",
        description: "new purchase",
        order_id: data.orderId,
        handler: async function (response: any) {
          try {
            console.log("inside handler", response);
            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();
            console.log("verifyData", verifyData);

            if (verifyData.status === "success") {
              paymentDetail.status = "success";
              // Placing the order after successful payment
              handleOrderSubmit(paymentDetail);
            } else {
              paymentDetail.status = "failure";
            }
          } catch (error) {
            console.error("Verification Error:", error);
            paymentDetail.status = "verificationError";
          }
        },
        modal: {
          ondismiss: function () {
            console.log("Payment cancelled");
            paymentDetail.status = "cancelled";
          },
        },
      };

      const rzpay = new window.Razorpay(options);
      rzpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
      paymentDetail.status = "paymentError";
    }
  }

  async function handleOrderSubmit(paymentDetail: PaymentDetails) {
    console.log("paymentDetails: ", paymentDetail);
    const orderData = {
      user: {
        ...userDetails,
        address:
          `${userDetails.addressLine1}, ${userDetails.addressLine2}, ${userDetails.landmark}`.trim(),
      },
      items: productStore || [],
      extraCharge: isCOD ? cod_charge.extraFees : 0,
      discountedPrice: getDiscountedTotal(),
      totalAmount: getUserTotalToPay(),
      isGiftWrap: isGiftWrap,
      isCOD: isCOD,
      // total: finalTotal,
      // isCOD,
      // isGiftWrap,
      couponApplied,
      couponInput,
      paymentStatus: paymentDetail.status,
      paymentAmount: paymentDetail.ammount,
      paymentOrderID: paymentDetail.orderId,
    };

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        scrollTo({ top: 0, behavior: "smooth" });
        emptyCart();
        setUserDetails({
          name: "",
          email: "",
          mobile: "",
          pincode: "",
          addressLine1: "",
          addressLine2: "",
          landmark: "",
          transactionId: "",
        });
        setIsCOD(false);
        setShowCheckoutForm(false);
        setIsOrderPlaced(true);
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  }

  return (
    <div className=" text-white  flex min-h-screen w-full flex-col bg-black">
      <NavBar offCart={true} />
      <div className=" max-w-7xl grid grid-cols-1 md:grid-cols-2  md:divide-x divide-neutral-500 px-6 py-12  mx-auto w-full">
        <div className=" px-4 order-1 md:order-first">
          <div className="flex items-center gap-3">
            <Checkbox
              checked={isGiftWrap}
              onCheckedChange={() => setIsGiftWrap(!isGiftWrap)}
              className=" border border-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
              id="terms"
            />
            <Label className=" text-lg cursor-pointer" htmlFor="terms">
              Add gift wrap for only ₹40
            </Label>
          </div>

          <Separator className=" my-4" />

          <div className=" mt-4">
            <Label>Available Coupons</Label>
            <ul className=" mt-4 space-y-2">
              {COUPONS.map((coupon) => (
                <li
                  key={coupon.code}
                  className=" flex items-center justify-between gap-4"
                >
                  <p>
                    {" "}
                    <strong>{coupon.code}</strong>: {coupon.discountPercent}%
                    off above ₹{coupon.minAmount}
                  </p>
                  <Button size={"sm"} onClick={() => applyCoupon(coupon.code)}>
                    {appliedCoupon === coupon.code
                      ? "Coupon Applied"
                      : "Apply Coupon"}
                  </Button>
                </li>
              ))}
            </ul>
            {couponError && <p style={{ color: "red" }}>{couponError}</p>}

            <Separator className=" my-4" />

            <h2 className="mb-4 text-xl font-semibold text-white">Contact</h2>
            <Label>Name</Label>
            <input
              type="text"
              placeholder="John Doe"
              className={inputClassName}
              value={userDetails.name}
              onChange={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
              }
              required
            />
            <Label>Email</Label>

            <input
              type="email"
              placeholder="mail.email.com"
              className={inputClassName}
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              required
            />
            <Label>Mobile Number</Label>

            <input
              type="tel"
              placeholder="+91 1234567890"
              className={inputClassName}
              value={userDetails.mobile}
              onChange={(e) =>
                setUserDetails({ ...userDetails, mobile: e.target.value })
              }
              required
            />
            <Label>Pin Code</Label>

            <input
              type="text"
              placeholder="123456"
              className={inputClassName}
              value={userDetails.pincode}
              onChange={(e) =>
                setUserDetails({ ...userDetails, pincode: e.target.value })
              }
              required
            />
            <Label>Address Line 1</Label>

            <input
              type="text"
              placeholder="Address Line 1"
              className={inputClassName}
              value={userDetails.addressLine1}
              onChange={(e) =>
                setUserDetails({ ...userDetails, addressLine1: e.target.value })
              }
              required
            />
            <Label>Address Line 2</Label>
            <input
              type="text"
              placeholder="Address Line 2"
              className={inputClassName}
              value={userDetails.addressLine2}
              onChange={(e) =>
                setUserDetails({ ...userDetails, addressLine2: e.target.value })
              }
              required
            />
            <Label>Landmark (Optional)</Label>
            <input
              type="text"
              placeholder="Landmark (Optional)"
              className={inputClassName}
              value={userDetails.landmark}
              onChange={(e) =>
                setUserDetails({ ...userDetails, landmark: e.target.value })
              }
            />
          </div>
          <Separator className=" my-4" />
          <p className=" font-semibold text-lg">Payment Method</p>

          <div className=" flex w-full gap-3 text-center mt-1">
            <p
              onClick={() => setIsCOD(true)}
              className={cn(
                " w-full border p-2 rounded-md  cursor-pointer",
                isCOD &&
                  "border-green-500 border-2 text-green-500 bg-green-600/20"
              )}
            >
              Cash on Delivery
            </p>
            <p
              onClick={() => setIsCOD(false)}
              className={cn(
                " w-full border p-2 rounded-md ",
                !isCOD &&
                  "border-green-500 border-2 text-green-500 bg-green-600/20"
              )}
            >
              Pay online
            </p>
          </div>

          <p className=" mt-2">
            {isCOD
              ? `${cod_charge.depositPercentage}% Booking deposit and remaining cash on delivery (NOTE: Rs. ${cod_charge.extraFees} Extra Fees for COD)`
              : ``}
          </p>
          <Button
            onClick={handlePlaceOrder}
            className=" w-full py-3 mt-3 bg-green-500 hover:bg-green-600"
          >
            Pay ₹{getUserTotalToPay()}
          </Button>
        </div>
        <div>
          <div className=" h-full px-4 ">
            {productStore.map((item: any) => (
              <div key={item.id} className=" flex gap-1 py-3">
                <div className="col-span-1 flex w-full flex-col gap-3 md:flex-row  md:space-x-4">
                  <div className="relative size-12 shrink-0 rounded-lg md:size-16">
                    <Image
                      // src={}
                      src={convertS3ToImageKit(item.image)}
                      alt={item.name}
                      height={100}
                      width={100}
                      className="rounded w-full h-full  object-cover"
                    />
                    <p className=" p-1.5 size-6 flex justify-center items-center shrink-0 aspect-square  rounded-full bg-gray-400 absolute -top-2 -right-2 cursor-pointer">
                      {item.quantity}
                    </p>
                  </div>
                  <div>
                    <h3 className="line-clamp-2 text-sm text-neutral-300 md:text-base max-w-72">
                      {item.name}
                    </h3>
                  </div>
                </div>

                <div className=" flex flex-col justify-between gap-2">
                  <div className="col-span-1 text-right  text-p-green">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}

            <div className=" sticky top-40">
              <Table>
                <TableBody>
                  <TableRow className=" hover:bg-neutral-900">
                    <TableHead>Cart Total</TableHead>
                    <TableCell className=" text-right w-52 text-lg">
                      ₹ {getCartTotal()}
                    </TableCell>
                  </TableRow>
                  <TableRow className=" hover:bg-neutral-900">
                    <TableHead>Taxes</TableHead>
                    <TableCell className="text-right w-52  text-base">
                      <p>{getTaxes()}</p>
                    </TableCell>
                  </TableRow>

                  <TableRow className=" hover:bg-neutral-900">
                    <TableHead>
                      Delivery Charges(Free for orders above Rs.
                      {MINIMUM_AMOUNT_FOR_FREE_DELIVERY})
                    </TableHead>
                    <TableCell className="text-right w-52  text-base">
                      {getDeliveryCharges()}
                    </TableCell>
                  </TableRow>
                  {Number(getUserTotalToPayonDelivery()) !== 0 && (
                    <TableRow className=" hover:bg-neutral-900">
                      <TableHead>Payable at delivery time</TableHead>
                      <TableCell className="text-right w-52  text-base">
                        {getUserTotalToPayonDelivery()}
                      </TableCell>
                    </TableRow>
                  )}
                  {appliedCoupon && (
                    <TableRow className="   hover:bg-neutral-900">
                      <TableHead>Discount Applied ({appliedCoupon})</TableHead>
                      <TableCell className="text-right w-52  text-base">
                        - ₹ {getDiscountedTotal()}
                      </TableCell>
                    </TableRow>
                  )}
                  {isGiftWrap && (
                    <TableRow className="   hover:bg-neutral-900">
                      <TableHead>Gift Wrap</TableHead>
                      <TableCell className="text-right w-52  text-base">
                        ₹ {getGiftWrapCharges()}
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow className=" hover:bg-neutral-900">
                    <TableHead>Total</TableHead>
                    <TableCell className="text-right w-52 text-xl">
                      ₹ {getUserTotalToPay()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

const inputClassName =
  "mb-4 w-full rounded-lg border border-gray-500 bg-transparent px-4 py-2 text-white focus:outline-none";

const COUPONS = [
  { code: "GET5", discountPercent: 5, minAmount: 1000 },
  { code: "GET10", discountPercent: 10, minAmount: 1500 },
];

const cod_charge = {
  depositPercentage: 10,
  extraFees: 30,
};

const MINIMUM_AMOUNT_FOR_FREE_DELIVERY = 1199;
const DELIVERY_CHARGES = 60;
