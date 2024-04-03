import Link from 'next/link';

export const DeveloperCredit = () => (
    <div className='p-4 flex justify-center border-t-[1px] border-t-slate-200 text-sm'>
        Desenvolvido por:
        <Link href="https://github.com/edgardamasceno-dev" className='text-slate-800 ml-2 font-semibold hover:underline'>
            Edgar Damasceno
        </Link>
    </div>
);