import Link from 'next/link';

export const NavItem = ({ href, text, isMobile = false }) => {
    const className = isMobile ? 'p-4 hover:bg-violet-800 hover:text-white hover:font-semibold cursor-pointer border-gray-600 duration-300' : 'flex justify-center items-center w-24 h-12 hover:bg-violet-800 hover:text-white hover:font-semibold m-2 cursor-pointer duration-300';
    return (
        <li className={className}>
            <Link prefetch href={href}>{text}</Link>
        </li>
    );
};