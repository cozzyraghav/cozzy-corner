import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const newRazorpay = new Razorpay({
  key_id: process.env.RAZERPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  // console.log('body', body);
  const amount = body.onlinePaymentAmmount;
  try {
    const order = await newRazorpay.orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_${Math.random().toString(36).substring(7)}`,
    });

    // console.log('backend order' + JSON.stringify(order));

    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
