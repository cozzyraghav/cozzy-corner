import connect from '@/dbConfig/dbConfig';
import Product from '@/Models/productModel';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { searchName } = body;

  await connect();

  if (searchName === '') {
    return new Response(JSON.stringify([]), {
      status: 200,
    });
  }

  const orderDataString = await Product.find({
    $or: [
      { name: { $regex: searchName, $options: 'i' } },
      { category: { $regex: searchName, $options: 'i' } },
      { series: { $regex: searchName, $options: 'i' } },
    ],
  });

  if (orderDataString.length === 0) {
    return new Response(JSON.stringify({ message: 'No order found' }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(orderDataString), {
    status: 200,
  });
}
