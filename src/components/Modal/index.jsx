'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";

export const Modal = ({ visible, children }) => {
    const [isOpen, setIsOpen] = useState(visible);
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        setIsOpen(visible);
    }, [visible]);

    useEffect(() => {
        const path = pathname + searchParams.toString();
        if (path === '/') {
            handleClose();
        }
    }, [pathname, searchParams])

    const handleClose = () => {
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex justify-center items-center"
            onClick={handleClose}
        >
            <div className="bg-white bg-opacity-50 backdrop-blur-md hidden md:block md:absolute inset-0 " aria-hidden="true"></div>
            <div
                className="z-10 bg-white p-2 w-full h-screen md:w-[40vw] md:min-w-[360px] md:h-fit md:rounded-lg md:shadow-lg"
                onClick={e => e.stopPropagation()}
            >
                <div className='w-full flex justify-end'>
                    <IoCloseOutline className='h-6 w-6 cursor-pointer text-slate-400 hover:text-orange-500' onClick={handleClose} />
                </div>
                {children}
            </div>
        </div>
    );
};
