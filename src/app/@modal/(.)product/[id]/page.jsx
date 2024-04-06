'use client';
import { Modal } from '@/components/Modal';
import { ProductDetailsWrapper } from '@/components/Product';
import { useRouter } from 'next/navigation';


const Page = (context) => {
    const router = useRouter()
    const { id } = context.params;
    return (
        <div className='overflow-hidden'>
            <Modal>
                <ProductDetailsWrapper id={id} />
            </Modal>
        </div>
    )
}

export default Page;