import connect from '@/dbConfig/dbConfig';
import OrderModel from '@/Models/orderModel';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, status } = body;

  try {
    await connect();
    const data = await OrderModel.findOneAndUpdate({ _id: id }, { status });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error updating order state:', error);
    return new Response('Error updating order state', { status: 500 });
  }
}
