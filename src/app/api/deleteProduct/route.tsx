import connect from '@/dbConfig/dbConfig';
import Product from '@/Models/productModel';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id } = body;

  await connect();

  const product = await Product.deleteOne({ id });

  return new Response(JSON.stringify({ message: 'Product deleted' }), {
    status: 200,
  });
}
