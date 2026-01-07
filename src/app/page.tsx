
'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

const HomePage = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <div>
                <Link href="/" className="flex items-center py-4 px-2">
                  <span className="font-semibold text-gray-500 text-lg">E-commerce</span>
                </Link>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <Link href="/products" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Products</Link>
                <Link href="/orders" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Orders</Link>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-3 ">
              {user ? (
                <button onClick={logout} className="py-2 px-2 font-medium text-white bg-red-500 rounded hover:bg-red-400 transition duration-300">Logout</button>
              ) : (
                <Link href="/login" className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">Login</Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to our E-commerce Store!</h1>
        <p className="text-lg text-gray-700 mb-8">Discover a wide range of products and enjoy a seamless shopping experience.</p>
        <Link href="/products" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
