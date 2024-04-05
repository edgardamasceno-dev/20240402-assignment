'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";

export const Modal = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const pathname = usePathname();
    const [searchParams] = useSearchParams();
    const router = useRouter();

    const handleClose = useCallback(() => {
        const path = pathname + (searchParams ? searchParams.toString() : '');
        if (path !== '/') {
            router.back();
        }
        setIsOpen(false);
    }, [pathname, searchParams, router]);

    useEffect(() => {
        const path = pathname + (searchParams ? searchParams.toString() : '');
        if (path === '/') {
            handleClose();
        }
    }, [pathname, searchParams, handleClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50" onClick={handleClose}>
            <div className="bg-orange-500 bg-opacity-30 backdrop-blur-sm max-h-svh max-w-full hidden md:block md:absolute inset-0" aria-hidden="true"></div>
            <div className="z-10 bg-white p-2 w-full h-screen md:w-[40vw] md:min-w-[360px] md:h-fit md:rounded-lg md:shadow-lg" onClick={e => e.stopPropagation()}>
                <div className='w-full flex justify-end'>
                    <IoCloseOutline className='h-6 w-6 cursor-pointer text-slate-400 hover:text-orange-500' onClick={handleClose} />
                </div>
                {children}
            </div>
        </div>
    );
};
