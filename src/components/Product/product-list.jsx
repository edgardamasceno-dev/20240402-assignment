import Link from 'next/link';
import { ProductCard } from './';
export const ProductList = ({ products }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map(product => (
                <Link href={`/product/${product.id}`} key={product.id}>
                    <ProductCard key={product.id} product={product} />
                </Link>
            ))}
        </div>
    );
};
