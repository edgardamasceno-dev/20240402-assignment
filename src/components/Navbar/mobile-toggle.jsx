import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

export const MobileToggle = ({ isNavOpen, toggleNav }) => (
    <div onClick={toggleNav} className='md:hidden cursor-pointer'>
        {isNavOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
    </div>
);