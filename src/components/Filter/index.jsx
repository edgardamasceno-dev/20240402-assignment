'use client';
import { Autocomplete } from '@/components/Autocomplete';
import { ColorSelector } from '@/components/ColorsSelector';
import { Range } from '@/components/Range';
import { SizeSelector } from '@/components/SizeSelector';
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
    onFilterChange = () => console.log
}) => {
    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                <div className="p-4">
                    <Autocomplete
                        items={names || []}
                        label="Pesquisar Nome:"
                        text={currentName}
                        onTextChange={onFilterChange}
                    />
                </div>
                <div className="p-4">
                    <Range
                        label="Preço Máximo:"
                        min={Math.ceil(minPrice)}
                        max={Math.ceil(maxPrice)}
                        current={Math.ceil(currentPrice)}
                        onRangeChange={onFilterChange}
                    />
                </div>
                <div className="p-4">
                    <ColorSelector
                        label="Selecione uma Cor:"
                        colors={colors}
                        color={currentColor}
                        onColorChange={onFilterChange}
                    />
                </div>
                <div className="p-4">
                    <SizeSelector
                        label="Escolha o tamanho:"
                        sizes={sizes}
                        size={currentSize}
                        onSizeChange={onFilterChange}
                    />
                </div>
            </div>
        </div>
    )
}