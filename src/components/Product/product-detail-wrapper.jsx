'use client';
import { useEffect, useState } from 'react';
import { ProductDetails } from './';

export const ProductDetailsWrapper = ({ id }) => {
    const [product, setProduct] = useState(null);
    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`/api/products/${id}`);
            if (response.ok) {
                const data = await response.json();
                setProduct(data);
            } else {
                console.error('Failed to fetch product');
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    return <ProductDetails product={product} />;
};
