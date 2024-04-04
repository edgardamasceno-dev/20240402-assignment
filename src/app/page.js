import { list } from "@/actions/products";
import { Modal } from "@/components/Modal";
import { ProductDetailsWrapper, ProductList } from "@/components/Product";
import { Suspense } from 'react';
export default async function Home() {
  const data = await list();
  return (
    <main className="flex flex-col items-center justify-between py-4 px-0">
      <Suspense fallback={<h1>Carregando lista de produtos...</h1>}>
        <ProductList products={data.products} />
      </Suspense>
      <Modal visible={true}>
        <ProductDetailsWrapper id="15445658-d08a-477a-9bc7-4ce08f5ca7c1" />
      </Modal>
    </main>
  );
}