'use server';
import { list } from '@/actions/products';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  const filters = {
    name: searchParams.get('name') || null,
    color: searchParams.get('color') || null,
    size: searchParams.get('size') || null,
    price: parseFloat(searchParams.get('price')) || Infinity,
  };

  console.log(filters);

  const filteredProducts = await list(filters);

  console.log('result', filteredProducts);

  return new Response(JSON.stringify(filteredProducts), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
