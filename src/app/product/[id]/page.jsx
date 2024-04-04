import { getProductById } from '@/actions/products';
import { ProductDetails } from '@/components/Product';

const Page = async (context) => {
    const { id } = context.params;
    const product = await getProductById(id);
    console.log(product);
    return (
        <div className='my-4 mx-4'>
            <ProductDetails product={product} />
        </div>
    )
}

export default Page;