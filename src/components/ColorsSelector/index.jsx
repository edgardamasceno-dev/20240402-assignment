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
      <p className='text-slate-500 font-light text-sm'>{label}
        <span className='font-semibold text-violet-800'>
          {" "}{selectedColor !== 'nenhum' ? colorNameMap[selectedColor] || selectedColor : 'Nenhum'}
        </span>
      </p>
      <div className="flex space-x-1">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => handleSelectColor(color)}
            className={clsx(
              'focus:outline-none focus:ring-2 focus:ring-violet-800 hover:border-violet-800 h-7 w-7 border-[2px] rounded-md flex justify-center items-center',
              colorMap[color.toLowerCase()],
              {
                'border-2 border-violet-800': selectedColor === color.toLowerCase(),
                'border slate-200': selectedColor !== color.toLowerCase(),
              }
            )}
            aria-label={colorNameMap[color.toLowerCase()] || color}
          >
          </button>
        ))}
        <button
          onClick={() => handleSelectColor('Nenhum')}
          className={clsx(
            'h-7 w-7 rounded-md border-[2px] hover:border-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-800 flex justify-center items-center',
            {
              'border-violet-800 bg-violet-800': selectedColor === 'nenhum',
              'border slate-200': selectedColor !== 'nenhum',
            }
          )}
          aria-label="Remover seleção de cor"
        >
          <AiOutlineClose className={clsx(
            'text-slate-200 hover:text-violet-800',
            {
              'text-white': selectedColor === 'nenhum',
            }
          )} />
        </button>
      </div>
    </div>
  );
};
