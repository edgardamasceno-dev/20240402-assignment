'use client';
import { useState } from 'react';

export const Range = ({ label, min, max, current = Infinity, onRangeChange }) => {
    const [value, setValue] = useState(current === Infinity ? max : 0);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        onRangeChange(newValue);
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
                className="appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-slate-200 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[28px] [&::-webkit-slider-thumb]:w-[28px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500"
                name="range"
            />
        </div>
    );
}