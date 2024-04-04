import fs from 'fs';
import path from 'path';

const productsFilePath = path.join(process.cwd(), 'src', 'data', 'products.json');

export async function GET(request, context) {
    const { id } = context.params;

    const productsData = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
    const product = productsData.find(product => product.id === id);

    if (!product) {
        return new Response(JSON.stringify({ error: 'Product not found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return new Response(JSON.stringify(product), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
