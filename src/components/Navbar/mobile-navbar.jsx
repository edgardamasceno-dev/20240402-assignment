'use client';
import { useState } from "react";
import { MobileMenu, MobileToggle } from './';

export const MobileNavbar = ({ menuItems }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const toggleNav = () => setIsNavOpen(!isNavOpen);

    return (
        <>
            <MobileToggle isNavOpen={isNavOpen} toggleNav={toggleNav} />
            <MobileMenu isNavOpen={isNavOpen} toggleNav={toggleNav} menuItems={menuItems} />
        </>
    )
}