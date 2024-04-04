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
}) => {
    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                <div className="p-4">
                    <Autocomplete
                        items={names || []}
                        label="Pesquisar Nome:"
                        text={currentName}
                        onTextChange={console.log}
                    />
                </div>
                <div className="p-4">
                    <Range
                        label="Preço Máximo:"
                        min={Math.ceil(minPrice)}
                        max={Math.ceil(maxPrice)}
                        current={Math.ceil(currentPrice)}
                        onRangeChange={console.log}
                    />
                </div>
                <div className="p-4">
                    <ColorSelector
                        label="Selecione uma Cor:"
                        colors={colors}
                        color={'Azul'}
                        onColorChange={console.log}
                    />
                </div>
                <div className="p-4">
                    <SizeSelector
                        label="Escolha o tamanho:"
                        sizes={sizes}
                        size={currentSize}
                        onSizeChange={console.log}
                    />
                </div>
            </div>
        </div>
    )
}