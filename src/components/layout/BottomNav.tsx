
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
    { href: '/dashboard/products', label: 'Products' },
    { href: '/dashboard/catalogs', label: 'Catalogs' },
    { href: '/dashboard/orders', label: 'Orders' },
    { href: '/dashboard/profile', label: 'Profile' },
];

const BottomNav = () => {
    const pathname = usePathname();

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-t-md border-t border-gray-200">
            <div className="flex justify-around">
                {navLinks.map(({ href, label }) => {
                    const isActive = pathname.startsWith(href);
                    return (
                        <Link key={href} href={href} className={`flex flex-col items-center justify-center w-full pt-2 pb-1 text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>
                            <span>{label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNav;
