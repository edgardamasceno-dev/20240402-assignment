import Link from 'next/link';
import { AiOutlineFilter } from "react-icons/ai";
import { ProductCard } from './';

export const ProductList = ({ products }) => {
    if (!products || products.length === 0) {
        return (
            <div className="flex flex-col flex-1 justify-center items-center min-w-full">
                <div className='min-h-40 flex flex-col justify-between items-center'>
                    <div>
                        <h2 className="text-xl md:text-3xl text-center font-semibold text-slate-600">
                            Nenhum produto encontrado
                        </h2>
                        <p className="text-md text-center text-slate-400 mt-2">
                            Tente ajustar os filtros para descobrir mais opções.
                        </p>
                    </div>
                    <a prefetch href='/' className="text-md font-semibold flex items-center gap-2 mt-4 text-sm rounded border border-violet-800 text-violet-800 px-4 py-2 hover:bg-violet-800 hover:text-white transition-colors">
                        Limpar Filtros
                        <AiOutlineFilter className='h-5 w-5' />
                    </a>
                </div>
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
