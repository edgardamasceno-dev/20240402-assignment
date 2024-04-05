import { getById } from '@/actions/products';
import { ProductDetails } from '@/components/Product';

const Page = async (context) => {
    const { id } = context.params;
    const product = await getById(id);
    return (
        <section className='my-4 mx-4 w-full'>
            <ProductDetails product={product} />
        </section>
    )
}

export default Page;