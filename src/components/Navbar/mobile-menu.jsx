import { BrandLink, DeveloperCredit, MobileToggle, NavItem } from './';

export const MobileMenu = ({ isNavOpen, toggleNav, menuItems }) => {
    return (
        <div className={isNavOpen ? 'z-50 flex flex-col fixed md:hidden left-0 top-0 w-full h-full bg-slate-100 text-slate-600 ease-in-out duration-500' : 'ease-in-out duration-500 fixed top-0 bottom-0 left-[-100%] hidden'}>
            <div className='px-4 h-12 border-b-[1px] border-b-slate-200px-4 w-full flex flex-row items-center justify-between'>
                <BrandLink />
                <MobileToggle isNavOpen={isNavOpen} toggleNav={toggleNav} />
            </div>
            <ul>
                {menuItems.map((item) => (
                    <NavItem key={item.href} href={item.href} text={item.text} isMobile={true} />
                ))}
            </ul>
            <div className='flex-1'></div>
            <DeveloperCredit />
        </div>
    );
}