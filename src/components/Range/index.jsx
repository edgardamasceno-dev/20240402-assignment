import { useState } from 'react';

export const Range = ({ label, min, max, current = Infinity, onRangeChange }) => {
    const [value, setValue] = useState(current === Infinity ? max : current);
    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
    };

    const handleFinalChange = (e) => {
        onRangeChange(value);
    };

    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor="range" className='text-slate-500 font-light text-sm'>{label}
                <span className='font-semibold text-orange-500'> R$ {value}</span>
            </label>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={handleChange}
                onMouseUp={handleFinalChange}
                onKeyUp={handleFinalChange}
                className="appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-md [&::-webkit-slider-runnable-track]:bg-slate-100 border-[1px] border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[28px] [&::-webkit-slider-thumb]:w-[28px] [&::-webkit-slider-thumb]:rounded-md [&::-webkit-slider-thumb]:bg-orange-500"
                name="range"
            />
        </div>
    );
}
