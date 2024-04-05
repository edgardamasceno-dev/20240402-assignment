'use server';
import { getById } from '@/actions/products';

export async function GET(request, context) {
    const { id } = context.params;

    const product = await getById(id);

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
