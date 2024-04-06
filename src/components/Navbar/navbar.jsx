import { BrandLink, DesktopMenu } from '@/components/Navbar';
import { MobileNavbar } from './mobile-navbar';
export const Navbar = ({ menuItems }) => {
    return (
        <div className='bg-slate-100 border-b-[1px] border-b-slate-200 max-w-full px-4 text-slate-600'>
            <div className='w-full mx-auto flex justify-between items-center h-12'>
                <BrandLink />
                <DesktopMenu menuItems={menuItems} />
                <MobileNavbar menuItems={menuItems} />
            </div>
        </div>
    );
};
