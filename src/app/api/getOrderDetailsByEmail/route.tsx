import connect from '@/dbConfig/dbConfig';
import OrderModel from '@/Models/orderModel';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email } = body;

  await connect();

  const orderDataString = await OrderModel.find({ email });
  if (orderDataString.length === 0) {
    return new Response(JSON.stringify({ message: 'No order found' }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(orderDataString), {
    status: 200,
  });
}
