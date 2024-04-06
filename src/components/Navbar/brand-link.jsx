import Link from 'next/link';

export const BrandLink = () => (
    <Link prefetch href={{ pathname: '/' }} className='text-3xl font-bold text-violet-800 h-12 flex justify-center items-center'>
        camisetei
    </Link>
);