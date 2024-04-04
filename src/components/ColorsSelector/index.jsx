import { clsx } from 'clsx';
import { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";

export const ColorSelector = ({ colors, label, color = 'Nenhum', onColorChange }) => {
  const [selectedColor, setSelectedColor] = useState(color);

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
    Nenhum: ''
  };

  const handleSelectNone = () => {
    setSelectedColor("Nenhum");
    if (onColorChange) {
      onColorChange("Nenhum");
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      <label className='text-slate-500 font-light text-sm'>{label}
        <span className='font-semibold text-orange-500'>
          {" "}{selectedColor !== "Nenhum" ? colorNameMap[selectedColor] : "Nenhum"}
        </span>
      </label>
      <div className="flex space-x-2">
        {colors.map(color => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            className={clsx(
              'h-7 w-7 border rounded-full flex justify-center items-center',
              colorMap[color.toString().toLowerCase()],
              {
                'border-2 border-orange-500': selectedColor === color,
                'border slate-200': selectedColor !== color,
              }
            )}
          >
          </button>
        ))}
        <button
          onClick={handleSelectNone}
          className={clsx(
            'h-7 w-7 border rounded-full flex justify-center items-center',
            {
              'border-2 border-orange-500 bg-orange-500': selectedColor === "Nenhum",
              'border slate-200': selectedColor !== "Nenhum",
            }
          )}
        >
          <AiOutlineClose className={clsx(
            {
              'text-white': selectedColor === "Nenhum",
              'text-slate-200': selectedColor !== "Nenhum",
            }
          )} />
        </button>
      </div>
    </div>
  );
};
