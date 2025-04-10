import connect from '@/dbConfig/dbConfig';
import Product from '@/Models/productModel';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const ids = body.ids;

  await connect();

  const data = await Product.find({ id: { $in: ids } });

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
