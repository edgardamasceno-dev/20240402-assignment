import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { AiFillHeart, AiOutlineArrowLeft, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

export const ProductDetails = ({ product }) => {
    if (!product) {
        return (
            <div className="mt-12 flex flex-col justify-center items-center md:h-[50vh]">
                <h2 className="text-xl md:text-3xl font-semibold text-slate-600">
                    Produto não encontrado
                </h2>
                <p className="text-md md:text-xl text-slate-400 mt-2">
                    O produto que você está procurando não existe ou não está mais disponível.
                </p>
                <Link prefetch href="/" className="mt-4 text-sm rounded border border-violet-800 text-violet-800 px-4 py-2 hover:bg-violet-800 hover:text-white transition-colors">
                    Voltar à página inicial
                </Link>
            </div>
        );
    }

    const colorMap = {
        preto: 'bg-black',
        branco: 'bg-white',
        vermelho: 'bg-red-500',
        azul: 'bg-blue-500',
        verde: 'bg-green-500',
    };

    return (
        <div className="flex flex-col gap-2 min-w-[340px] w-full h-full mt-2">
            <div className="relative">
                <Image priority={true} src={product.imageUrl} alt={product.name} width={600} height={600} className='rounded-md w-full max-h-[55svh] object-cover' />
                <div className="absolute top-0 right-0 m-2">
                    {product.isFavourite ? <AiFillHeart className='w-6 h-6 text-violet-800' /> : <AiOutlineHeart className='w-6 h-6 text-violet-800' />}
                </div>
                <div className="absolute bottom-0 left-0 m-2 bg-white rounded-md px-3 py-2">
                    <p className="text-slate-500 font-semibold">R$ {product.price}</p>
                </div>
            </div>
            <div className="flex flex-col justify-between h-full">
                <h2 className="text-xl text-slate-600 font-bold capitalize">{product.name}</h2>
                <div className='mb-[35px] md:mb-0 flex flex-col'>
                    <div className='mb-4'>
                        <h3 className="font-light text-sm text-slate-500 mb-2">Tamanhos Disponíveis</h3>
                        <div className="flex space-x-2">
                            {product.sizes.map(size => (
                                <span key={size} className="h-7 w-7 border hover:border-2 hover:border-violet-800 rounded text-sm text-slate-600 flex justify-center items-center">{size}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-light text-sm text-slate-500 mb-2">Cores Disponíveis</h3>
                        <div className="flex space-x-2">
                            {product.colors.map(color => (
                                <span key={color} className={clsx('h-7 w-7 border hover:border-2 hover:border-violet-800 rounded text-sm', colorMap[color.toString().toLowerCase()])}> </span>
                            ))}
                        </div>
                    </div>
                    <div className='mt-2 pt-2 border-t-[1px] border-slate-100 flex flex-col-reverse lg:flex-row gap-2'>
                        <Link prefetch href="/">
                            <div className="w-full text-sm rounded border-[2px] border-violet-800 text-violet-800 px-4 py-2 flex items-center justify-center cursor-pointer hover:border-violet-800 hover:text-violet-800 box-border" >
                                <AiOutlineArrowLeft className='mr-2 w-6 h-6' />
                                Voltar
                            </div>
                        </Link>
                        <div className="w-full text-sm rounded bg-violet-800 text-white px-4 py-2 flex items-center justify-center cursor-pointer hover:bg-violet-800">
                            Adicionar!
                            <AiOutlineShoppingCart className='ml-2 w-6 h-6' />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};