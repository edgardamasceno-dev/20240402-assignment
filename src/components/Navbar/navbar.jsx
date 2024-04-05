import { BrandLink, DesktopMenu } from '@/components/Navbar';
import { MobileNavbar } from './mobile-navbar';
export const Navbar = ({ menuItems }) => {
    return (
        <div className='bg-slate-100 border-b-[1px] border-b-slate-200 max-w-full px-4 text-slate-600'>
            <a href="#maincontent" className="skip-link sr-only focus:not-sr-only absolute z-50">
                Pular para o conteúdo principal
            </a>
            <div className='max-w-[960px] w-full mx-auto flex justify-between items-center h-12'>
                <BrandLink />
                <DesktopMenu menuItems={menuItems} />
                <MobileNavbar menuItems={menuItems} />
            </div>
        </div>
    );
};
