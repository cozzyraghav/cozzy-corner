import connect from '@/dbConfig/dbConfig';
import Product from '@/Models/productModel';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const {
    name,
    price,
    discountPrice,
    description,
    productHeadlines,
    series,
    category,
    id,
  } = body;
  await connect();

  const data = await Product.findOneAndUpdate(
    { id },
    {
      name,
      price,
      discountPrice,
      description,
      productHeadlines,
      series,
      category,
    }
  );

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
