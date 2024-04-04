import { normalize, removeAccents } from '@/utils/string'; // Ajuste o caminho conforme necessário
import fs from 'fs';
import path from 'path';

const productsFilePath = path.join(process.cwd(), 'src', 'data', 'products.json');

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  const name = searchParams.get('name');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const size = searchParams.get('size');
  const color = searchParams.get('color');

  const productsData = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));

  const filteredProducts = productsData.filter(product => {
    const productNameNormalized = normalize(removeAccents(product.name));
    const queryNameNormalized = name ? normalize(removeAccents(name)) : '';

    const nameMatch = queryNameNormalized ? productNameNormalized.includes(queryNameNormalized) : true;
    const priceMatch = product.price >= (Number(minPrice) || 0) && product.price <= (Number(maxPrice) || Infinity);
    const sizeMatch = size ? product.sizes.includes(size) : true;
    const colorMatch = color ? product.colors.includes(color) : true;

    return nameMatch && priceMatch && sizeMatch && colorMatch;
  });

  const sizes = [...new Set(productsData.flatMap(product => product.sizes || []))];
  const colors = [...new Set(productsData.flatMap(product => product.colors || []))];
  const prices = productsData.map(product => product.price);
  const names = productsData.map(product => product.name);
  const response = {
    products: filteredProducts,
    sizes,
    colors,
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
    names
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
