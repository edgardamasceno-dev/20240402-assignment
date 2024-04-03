import { NavItem } from './';
export const DesktopMenu = ({ menuItems }) => (
    <ul className='hidden md:flex'>
        {menuItems.map((item) => (
            <NavItem key={item.href} href={item.href} text={item.text} />
        ))}
    </ul>
);