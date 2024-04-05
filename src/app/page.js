import { list } from "@/actions/products";
import { Filter } from "@/components/Filter";
import { ProductList } from "@/components/Product";
import { Suspense } from 'react';
export default async function Home(request) {
  const { name, color, size, price } = request.searchParams;
  const data = await list({ name, color, size, price });
  return (
    <main className="flex flex-col items-center justify-between py-4 px-0">
      <Filter
        names={data.names}
        currentName={name || ''}
        colors={data.colors}
        currentColor={color || 'Nenhum'}
        sizes={data.sizes}
        currentSize={size || 'Nenhum'}
        minPrice={data.minPrice || 0}
        maxPrice={data.maxPrice || 999}
        currentPrice={price || data.maxPrice || 999}
      />
      <Suspense fallback={<h1>Carregando lista de produtos...</h1>}>
        <ProductList products={data.products} />
      </Suspense>
    </main>
  );
}