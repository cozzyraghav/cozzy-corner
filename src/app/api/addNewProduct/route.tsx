import connect from '@/dbConfig/dbConfig';
import Product from '@/Models/productModel';
import { NextRequest } from 'next/server';

export async function POST(requiest: NextRequest) {
  const body = await requiest.json();

  await connect();
  const data = await Product.create(body);
  data.save();

  return new Response(
    JSON.stringify({
      message: 'Product added successfully',
    }),
    {
      status: 200,
    }
  );
}
