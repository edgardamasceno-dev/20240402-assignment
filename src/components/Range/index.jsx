import { useState } from 'react';
export const Range = ({ label, min, max, current = Infinity, onRangeChange }) => {
    const [value, setValue] = useState(current === Infinity ? max : current);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
    };

    const handleFinalChange = () => {
        onRangeChange(value);
    };

    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor="range" className='text-slate-500 font-light text-sm'>{label}
                <span className='font-semibold text-violet-800'> R$ {value}</span>
            </label>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={handleChange}
                onMouseUp={handleFinalChange}
                onKeyUp={handleFinalChange}
                onTouchEnd={handleFinalChange} // Adicionado para tratar eventos de toque
                className="appearance-none bg-transparent ..."
                id="range"
            />
        </div>
    );
}
