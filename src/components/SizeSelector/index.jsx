import { clsx } from 'clsx';
import { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";

export const SizeSelector = ({ sizes, label, size = 'Nenhum', onSizeChange }) => {
    const [selectedSize, setSelectedSize] = useState(size);

    const handleSizeChange = (size) => {
        setSelectedSize(size);
        if (onSizeChange) onSizeChange(size);
    };

    const handleSelectNone = () => {
        setSelectedSize("Nenhum");
        if (onSizeChange) onSizeChange("Nenhum");
    };

    return (
        <div className='flex flex-col gap-2'>
            <label className='text-slate-500 font-light text-sm'>{label}
                <span className='font-semibold text-orange-500'>
                    {" "}{selectedSize !== "Nenhum" ? selectedSize : "Nenhum"}
                </span>
            </label>
            <div className="flex space-x-2">
                {sizes.map(size => (
                    <button
                        key={size}
                        onClick={() => handleSizeChange(size)}
                        className={clsx(
                            'select-none border rounded-full text-xs flex justify-center items-center px-2 py-1 w-7 h-7 font-light',
                            {
                                'bg-orange-500 text-white border-orange-500': selectedSize === size,
                                'hover:bg-orange-500 hover:text-white hover:border-orange-500': selectedSize !== size,
                            }
                        )}
                    >
                        {size}
                    </button>
                ))}
                <button
                    onClick={handleSelectNone}
                    className={clsx(
                        'select-none border rounded-full flex justify-center items-center',
                        'w-7 h-7',
                        {
                            'bg-orange-500 border-orange-500 text-white': selectedSize === "Nenhum",
                            'border-slate-200 text-slate-200 hover:border-orange-500 hover:text-orange-500': selectedSize !== "Nenhum",
                        }
                    )}
                >
                    <AiOutlineClose />
                </button>
            </div>
        </div>
    );
};
