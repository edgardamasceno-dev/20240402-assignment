import { clsx } from 'clsx';
import Image from 'next/image';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export const ProductCard = ({ product }) => {

  const colorMap = {
    preto: 'bg-black',
    branco: 'bg-white',
    vermelho: 'bg-red-500',
    azul: 'bg-blue-500',
    verde: 'bg-green-500',
  };

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden shadow-slate-200 shadow-md hover:shadow-lg hover:scale-105 m-4 cursor-pointer">
      <Image src={product.imageUrl} alt={product.name} priority className="w-full h-80 object-cover" width={400} height={400} />
      <div className="p-4 flex flex-col">
        <h4 className="text-md text-slate-700 font-bold whitespace-nowrap truncate capitalize">{product.name.toString()}</h4>
        <p className="text-slate-500">R$ {product.price}</p>
        <div className='flex flex-col justify-end gap-2 h-32'>
          <span className='font-thin text-slate-500 text-xs'>Tamanhos Disponíveis</span>
          <div className="flex">
            {product.sizes.map(size => (
              <span key={size} className="mr-2 h-5 w-5 border hover:border-2 hover:border-orange-500 rounded text-sm flex justify-center items-center text-slate-600">{size}</span>
            ))}
          </div>
          <span className='font-thin text-slate-500 text-xs'>Cores Disponíveis</span>
          <div className="flex">
            {product.colors.map(color => (
              <span key={color} className={clsx('mr-2 h-5 w-5 border hover:border-2 hover:border-orange-500 rounded text-sm', colorMap[color.toString().toLowerCase()])}> </span>
            ))}
            <span className='flex-1'></span>
            {product.isFavourite ? <AiFillHeart className='w-5 h-5 text-orange-500 hover:text-orange-600' /> : <AiOutlineHeart className='w-6 h-6 text-orange-500 hover:text-orange-600' />}
          </div>
        </div>
      </div>
    </div>
  );
};  