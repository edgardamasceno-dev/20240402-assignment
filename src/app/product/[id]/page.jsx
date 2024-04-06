import { getById } from '@/actions/products';
import { ProductDetails } from '@/components/Product';

const Page = async (context) => {
    const { id } = context.params;
    const product = await getById(id);
    return (
        <section className='flex flex-col items-center justify-between max-w-[400px] mx-auto flex-1 px-4 py-2 md:max-w-[md]'>
            <ProductDetails product={product} />
        </section>
    )
}

export default Page;