import { useEffect, useRef, useState } from 'react';

export const Autocomplete = ({ items, label, text = '', placeholder = 'Buscar...', onTextChange }) => {
    const [inputValue, setInputValue] = useState(text);
    const [filteredItems, setFilteredItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        onTextChange(value);
        setIsOpen(true);

        if (!value) {
            setFilteredItems([]);
        } else {
            const filtered = items.filter(item =>
                item.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredItems(filtered);
        }
    };

    const handleSelect = (value) => {
        setInputValue(value);
        setIsOpen(false);
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
    }, [wrapperRef]);

    return (
        <div className='flex flex-col gap-2 relative' ref={wrapperRef}>
            <label className='text-slate-500 font-light text-sm'>
                {label}
                <span className='font-semibold text-orange-500'> {inputValue}</span>
            </label>
            <input
                type="text"
                value={inputValue}
                placeholder={placeholder}
                onChange={handleChange}
                className="text-sm text-slate-600 placeholder-slate-200 h-7 focus:outline-none focus:ring-2 focus:ring-orange-500 border-[1px] border-slate-200 rounded-full p-2"
                onFocus={() => filteredItems.length > 0 && setIsOpen(true)}
            />
            {isOpen && filteredItems.length > 0 && (
                <ul className="border rounded mt-16 max-h-40 overflow-auto absolute w-full z-10 bg-white shadow-md">
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
