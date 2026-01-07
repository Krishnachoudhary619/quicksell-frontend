
import Link from 'next/link';

const ProductCard = ({ product }: { product: any }) => {
    return (
        <Link href={`/dashboard/products/${product.id}/edit`}>
            <div className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-600">Price: ${product.price}</p>
                <p className="text-gray-600">Stock: {product.stock}</p>
                <p className={`text-sm font-medium ${product.isActive ? 'text-green-500' : 'text-red-500'}`}>
                    {product.isActive ? 'Active' : 'Inactive'}
                </p>
            </div>
        </Link>
    );
};

export default ProductCard;
