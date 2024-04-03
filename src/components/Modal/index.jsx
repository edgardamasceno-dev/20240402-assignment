'use client';
import { useEffect, useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";

export const Modal = ({ visible, children }) => {
    const [isOpen, setIsOpen] = useState(visible);

    console.log('Modal', isOpen);

    useEffect(() => {
        setIsOpen(visible);
    }, [visible]);

    const handleClose = () => {
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex justify-center items-center"
            onClick={handleClose}
        >
            <div className="absolute inset-0 bg-white bg-opacity-50 backdrop-blur-md" aria-hidden="true"></div>
            <div
                className="z-10 bg-white p-2 rounded-lg shadow-lg"
                onClick={e => e.stopPropagation()} // Para evitar que o modal feche quando o conteúdo é clicado.
            >
                <div className='w-full flex justify-end'>
                    <IoCloseOutline className='h-6 w-6 cursor-pointer text-slate-400 hover:text-orange-500' onClick={handleClose} />
                </div>
                {children}
            </div>
        </div>
    );
};
