import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";

export const ColorSelector = ({ colors, label, color = 'Nenhum', onColorChange }) => {
  const [selectedColor, setSelectedColor] = useState(color.toLowerCase());

  useEffect(() => {
    setSelectedColor(color.toLowerCase());
  }, [color]);

  const colorMap = {
    preto: 'bg-black text-white',
    branco: 'bg-white text-black',
    vermelho: 'bg-red-500 text-white',
    azul: 'bg-blue-500 text-white',
    verde: 'bg-green-500 text-white',
  };

  const colorNameMap = {
    preto: 'Preto',
    branco: 'Branco',
    vermelho: 'Vermelho',
    azul: 'Azul',
    verde: 'Verde',
  };

  const handleSelectColor = (color) => {
    const normalizedColor = color.toLowerCase();
    setSelectedColor(normalizedColor);
    if (onColorChange) {
      onColorChange(color);
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      <label className='text-slate-500 font-light text-sm'>{label}
        <span className='font-semibold text-orange-500'>
          {" "}{selectedColor !== 'nenhum' ? colorNameMap[selectedColor] || selectedColor : 'Nenhum'}
        </span>
      </label>
      <div className="flex space-x-2">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => handleSelectColor(color)}
            className={clsx(
              'focus:outline-none focus:ring-2 focus:ring-orange-500 hover:border-orange-500 h-7 w-7 border-[2px] rounded-md flex justify-center items-center',
              colorMap[color.toLowerCase()],
              {
                'border-2 border-orange-500': selectedColor === color.toLowerCase(),
                'border slate-200': selectedColor !== color.toLowerCase(),
              }
            )}
          >
          </button>
        ))}
        <button
          onClick={() => handleSelectColor('Nenhum')}
          className={clsx(
            'h-7 w-7 rounded-md border-[2px] hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 flex justify-center items-center',
            {
              'border-orange-500 bg-orange-500': selectedColor === 'nenhum',
              'border slate-200': selectedColor !== 'nenhum',
            }
          )}
        >
          <AiOutlineClose className={clsx(
            'text-slate-200 hover:text-orange-500',
            {
              'text-white': selectedColor === 'nenhum',
            }
          )} />
        </button>
      </div>
    </div>
  );
};
