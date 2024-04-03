import Image from 'next/image';

const ProductCard = ({ product }) => {
    return (
        <div className="border rounded-lg overflow-hidden shadow-lg m-4">
            <Image src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover" width={100} height={100} placeholder="blur" />
            <div className="p-4">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-gray-700">${product.price}</p>
                <div className="flex flex-wrap mt-2">
                    {product.sizes.map(size => (
                        <span key={size} className="mr-2 mb-2 px-2 py-1 border rounded text-sm">{size}</span>
                    ))}
                </div>
                <div className="flex flex-wrap">
                    {product.colors.map(color => (
                        <span key={color} className={`mr-2 mb-2 px-2 py-1 border rounded text-sm bg-${color.toLowerCase()}-200`}> </span>
                    ))}
                </div>
            </div>
        </div>
    );
};  