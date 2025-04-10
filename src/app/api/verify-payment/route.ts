import Razorpay from 'razorpay';
import crypto from 'crypto';
import { NextRequest } from 'next/server';

const newRazorpay = new Razorpay({
  key_id: process.env.RAZERPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = body;

    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET as string)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    if (generatedSignature === razorpaySignature) {
      // Payment verified
      return new Response(JSON.stringify({ status: 'success' }), {
        status: 200,
      });
    } else {
      // Verification failed
      return new Response(
        JSON.stringify({ status: 'failure', message: 'Invalid signature' }),
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return new Response(
      JSON.stringify({ status: 'failure', message: 'Internal server error' }),
      {
        status: 500,
      }
    );
  }
}
