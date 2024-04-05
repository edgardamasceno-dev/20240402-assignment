'use server';
import { normalize, removeAccents } from '@/utils/string';
import fs from 'fs';
import path from 'path';

const productsFilePath = path.join(process.cwd(), 'src', 'data', 'products.json');

export async function list({ name = null, color = null, size = null, price = Infinity }) {
    const productsData = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));

    const filteredProducts = await productsData.filter(product => {
        const productNameNormalized = name ? normalize(removeAccents(product.name)) : '';
        const queryNameNormalized = normalize(removeAccents(name || ''));

        const nameMatch = name ? productNameNormalized.includes(queryNameNormalized) : true;
        const priceMatch = price ? product.price <= price : true;
        const sizeMatch = size ? product.sizes.includes(size) : true;
        const colorMatch = color ? product.colors.includes(color) : true;

        return nameMatch && priceMatch && sizeMatch && colorMatch;
    });

    const prices = await productsData.map(product => product.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    const colors = [...new Set(productsData.flatMap(product => product.colors))];
    const sizes = [...new Set(productsData.flatMap(product => product.sizes))];

    const names = [
        ...new Set(
            productsData
                .flatMap(product => product.name.toLowerCase().split(/\s+/))
                .map(word => removeAccents(word))
                .filter(word => word.length >= 3)
        ),
    ];

    const result = {
        products: filteredProducts,
        minPrice,
        maxPrice,
        colors,
        sizes,
        names
    };

    return result;
}

export async function getById(productId) {
    const productsData = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
    const product = productsData.find(product => product.id === productId);
    return product;
}