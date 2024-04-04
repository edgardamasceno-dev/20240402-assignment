'use client';
import { Autocomplete } from '@/components/Autocomplete';
import { ColorSelector } from '@/components/ColorsSelector';
import { Range } from '@/components/Range';
import { SizeSelector } from '@/components/SizeSelector';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

export const Filter = ({
    names = [],
    sizes = [],
    colors = [],
    minPrice = 1,
    maxPrice = Infinity,
    currentName = '',
    currentSize = 'Nenhum',
    currentColor = 'Nenhum',
    currentPrice = Infinity,
}) => {
    const [name, setName] = useState(currentName);
    const [size, setSize] = useState(currentSize);
    const [color, setColor] = useState(currentColor);
    const [price, setPrice] = useState(currentPrice === Infinity ? maxPrice : currentPrice);
    const router = useRouter();

    useEffect(() => {
        const queryParams = new URLSearchParams({
            name,
            color: color === 'Nenhum' ? '' : color,
            size: size === 'Nenhum' ? '' : size,
            price: price === Infinity ? '' : price.toString(),
        }).toString();
        router.push(`/?${queryParams}`, undefined, { shallow: true });
    }, [name, size, color, price, router]);

    return (
        <div className="container mx-auto border-b-[1px] border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                <div className="p-4">
                    <Autocomplete
                        items={names || []}
                        label="Pesquisar Nome:"
                        text={name}
                        onTextChange={(newName) => setName(newName)}
                    />
                </div>
                <div className="p-4">
                    <Range
                        label="Preço Máximo:"
                        min={Math.ceil(minPrice)}
                        max={Math.ceil(maxPrice)}
                        current={Math.ceil(price)}
                        onRangeChange={(newPrice) => setPrice(newPrice)}
                    />
                </div>
                <div className="p-4">
                    <ColorSelector
                        label="Selecione uma Cor:"
                        colors={colors}
                        color={color}
                        onColorChange={(newColor) => setColor(newColor)}
                    />
                </div>
                <div className="p-4">
                    <SizeSelector
                        label="Escolha o tamanho:"
                        sizes={sizes}
                        size={size}
                        onSizeChange={(newSize) => setSize(newSize)}
                    />
                </div>
            </div>
        </div>
    );
};
