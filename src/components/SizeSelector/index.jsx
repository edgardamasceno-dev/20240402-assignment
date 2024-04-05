import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";

export const SizeSelector = ({ sizes, label, size = 'Nenhum', onSizeChange }) => {
    const [selectedSize, setSelectedSize] = useState(size);
    const [displaySize, setDisplaySize] = useState(size);

    useEffect(() => {
        setSelectedSize(size.toLowerCase());
        setDisplaySize(size === 'Nenhum' ? size : size.toUpperCase());
    }, [size]);

    const handleSizeChange = (selectedSize) => {
        setSelectedSize(selectedSize.toLowerCase());
        setDisplaySize(selectedSize);
        if (onSizeChange) {
            onSizeChange(selectedSize);
        }
    };

    const handleSelectNone = () => {
        setSelectedSize("nenhum");
        setDisplaySize("Nenhum");
        if (onSizeChange) onSizeChange("Nenhum");
    };

    return (
        <div className='flex flex-col gap-2'>
            <p className='text-slate-500 font-light text-sm'>{label}
                <span className='font-semibold text-violet-800'>
                    {" "}{displaySize}
                </span>
            </p>
            <div className="flex space-x-2">
                {sizes.map(size => (
                    <button
                        key={size}
                        onClick={() => handleSizeChange(size)}
                        aria-pressed={selectedSize === size.toLowerCase()}
                        className={clsx(
                            'focus:outline-none focus:ring-2 focus:ring-violet-800 select-none border-[2px] rounded-md text-xs flex justify-center items-center px-2 py-1 w-7 h-7 font-light',
                            {
                                'bg-violet-800 text-white border-violet-800 font-semibold': selectedSize === size.toLowerCase(),
                                'hover:text-violet-800 hover:border-violet-800': selectedSize !== size.toLowerCase(),
                            }
                        )}
                    >
                        {size}
                    </button>
                ))}
                <button
                    onClick={handleSelectNone}
                    aria-label="Deselecionar tamanho"
                    className={clsx(
                        'select-none border rounded-md flex justify-center items-center w-7 h-7 focus:outline-none focus:ring-2 focus:ring-violet-800',
                        {
                            'bg-violet-800 border-violet-800 text-white': selectedSize === "nenhum",
                            'border-slate-200 text-slate-200 hover:border-violet-800 hover:text-violet-800': selectedSize !== "nenhum",
                        }
                    )}
                >
                    <AiOutlineClose />
                </button>

            </div>
        </div>
    );
};
