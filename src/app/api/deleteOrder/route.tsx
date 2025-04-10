import connect from '@/dbConfig/dbConfig';
import OrderModel from '@/Models/orderModel';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id } = body;
  await connect();

  const order = await OrderModel.findOne({ _id: id });
  await OrderModel.deleteOne({ _id: id });
  return new Response(JSON.stringify({ message: 'Order deleted' }), {
    status: 200,
  });
}
