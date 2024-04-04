import { useEffect, useRef, useState } from 'react';
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

export const Autocomplete = ({ items, label, text = '', placeholder = 'Buscar...', onTextChange }) => {
    const [inputValue, setInputValue] = useState(text);
    const [filteredItems, setFilteredItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        if (!inputValue) {
            setFilteredItems([]);
            setIsOpen(false);
        } else {
            const filtered = items.filter(item =>
                item.toLowerCase().includes(inputValue.toLowerCase())
            );
            setFilteredItems(filtered);
            setIsOpen(true);
        }
    }, [inputValue, items]);

    const handleSelect = (value) => {
        setInputValue(value);
        setIsOpen(false);
        onTextChange(value);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className='flex flex-col gap-2 relative' ref={wrapperRef}>
            <label htmlFor='name' className='text-slate-500 font-light text-sm'>{label}</label>
            <div className="relative">
                <input
                    type="text"
                    id="name"
                    autoComplete='off'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={placeholder}
                    className="w-full text-sm text-slate-600 placeholder-slate-200 h-7 focus:outline-none focus:ring-2 focus:ring-orange-500 border-[1px] border-slate-200 rounded-md p-2 pl-10 pr-10"
                />
                <AiOutlineClose
                    onClick={() => setInputValue('')}
                    className="absolute left-[2px] top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-orange-500 cursor-pointer rounded-md bg-none w-6 h-6 p-1 active:bg-orange-500 active:text-white duration-200 transition-all"
                />
                <AiOutlineSearch
                    onClick={() => onTextChange(inputValue)}
                    className="absolute right-[2px] top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-orange-500 cursor-pointer rounded-md bg-none w-6 h-6 p-1 active:bg-orange-500 active:text-white duration-200 transition-all"
                />
            </div>
            {isOpen && filteredItems.length > 0 && (
                <ul className="border rounded mt-1 max-h-40 overflow-auto absolute w-full z-10 bg-white shadow-md">
                    {filteredItems.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(item)}
                            className="px-2 py-1 text-sm text-slate-600 hover:bg-orange-500 hover:text-white cursor-pointer"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
