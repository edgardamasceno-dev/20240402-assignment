'use server'

export async function list() {
    try {
        const response = await fetch('http://localhost:3000/api/products');
        return await response.json();
    } catch (err) {
        console.error(err);
    }
}

export async function getProductById(productId) {
    try {
        const url = `http://localhost:3000/api/products/${productId}`;

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                return { status: 404, body: { error: 'Product not found' } };
            }
            throw new Error(`API call failed with status ${response.status}`);
        }

        const product = await response.json();
        return product;
    } catch (err) {
        throw new Error('Failed to fetch product');
    }
}