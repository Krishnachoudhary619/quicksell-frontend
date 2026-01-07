
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
    { href: '/dashboard/products', label: 'Products' },
    { href: '/dashboard/catalogs', label: 'Catalogs' },
    { href: '/dashboard/orders', label: 'Orders' },
    { href: '/dashboard/profile', label: 'Profile' },
];

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="hidden md:block md:w-64 bg-white shadow-md">
            <div className="px-3 py-4">
                <ul className="space-y-2">
                    {navLinks.map(({ href, label }) => {
                        const isActive = pathname.startsWith(href);
                        return (
                            <li key={href}>
                                <Link href={href} className={`flex items-center p-2 text-base font-normal rounded-lg ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-900 hover:bg-gray-100'}`}>
                                    {label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
