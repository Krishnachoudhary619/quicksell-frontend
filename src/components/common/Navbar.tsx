import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          E-commerce
        </Link>
        <div className="flex space-x-4">
          <Link href="/products" className="text-gray-300 hover:text-white">
            Products
          </Link>
          <Link href="/orders" className="text-gray-300 hover:text-white">
            Orders
          </Link>
          <Link href="/login" className="text-gray-300 hover:text-white">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};
