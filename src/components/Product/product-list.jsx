import Link from 'next/link';
import { ProductCard } from './';

export const ProductList = ({ products }) => {
    if (!products || products.length === 0) {
        return (
            <div className="flex flex-col flex-1 justify-center items-center min-w-full">
                <h2 className="text-xl md:text-3xl font-semibold text-slate-600">
                    Nenhum produto encontrado
                </h2>
                <p className="text-md md:text-xl text-slate-400 mt-2">
                    Tente ajustar os filtros para descobrir mais opções.
                </p>
                <Link prefetch href="/" className="mt-4 text-sm rounded border border-violet-800 text-violet-800 px-4 py-2 hover:bg-violet-800 hover:text-white transition-colors">
                    Limpar Filtros
                </Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4 px-4 min-w-full scroll-smooth">
            {products.map((product, index) => (
                <Link prefetch={false} href={`/product/${product.id}`} key={product.id} passHref>
                    <ProductCard product={product} priority={index < 1} />
                </Link>
            ))}
        </div>
    );
};
