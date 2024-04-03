'use server'

export async function list() {
    try {
        const response = await fetch('http://localhost:3000/api/products');
        return await response.json();
    } catch (err) {
        console.error(err);
    }
}