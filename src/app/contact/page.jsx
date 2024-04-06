import Link from 'next/link';
import { AiOutlineHome } from "react-icons/ai";

const Page = () => {
    return (
        <section className='flex flex-col items-center justify-between max-w-[400px] mx-auto flex-1 px-4 py-2 md:max-w-[md]'>
            <div className="flex flex-col flex-1 justify-center items-center min-w-full">
                <div className='min-h-40 flex flex-col justify-between items-center'>
                    <div>
                        <h2 className="text-xl md:text-3xl text-center font-semibold text-slate-600">
                            Fale conosco
                        </h2>
                        <p className="text-md text-center text-slate-400 mt-2">
                            Esta página ainda não foi implementada.
                        </p>
                    </div>
                    <Link prefetch href={{ pathname: '/' }} className="text-md font-semibold flex items-center gap-2 mt-4 text-sm rounded border border-violet-800 text-violet-800 px-4 py-2 hover:bg-violet-800 hover:text-white transition-colors">
                        Voltar à página inicial
                        <AiOutlineHome className='h-5 w-5' />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Page;