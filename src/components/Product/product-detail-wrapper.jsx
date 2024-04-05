'use client';
import { memo, useEffect, useState } from 'react';
import { ProductDetails } from './';

async function fetchProductDetails(id, setProduct, setError, setIsLoading) {
    setIsLoading(true);
    try {
        const response = await fetch(`/api/products/${id}`, {
            cache: 'force-cache',
            next: {
                revalidate: 3600
            }
        });
        if (response.ok) {
            const data = await response.json();
            setProduct(data);
        } else {
            throw new Error('Failed to fetch product');
        }
    } catch (error) {
        setError(error.message);
    } finally {
        setIsLoading(false);
    }
}

const ProductDetailsWrapperComponent = ({ id }) => {
    const [product, setProduct] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (id) {
            fetchProductDetails(id, setProduct, setError, setIsLoading);
        }
    }, [id]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    'use client';
    return <ProductDetails product={product} />;
};

export const ProductDetailsWrapper = memo(ProductDetailsWrapperComponent);
ProductDetailsWrapperComponent.displayName = 'ProductDetailsWrapper';
