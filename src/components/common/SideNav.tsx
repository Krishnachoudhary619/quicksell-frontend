
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/products', label: 'Products' },
    { href: '/dashboard/orders', label: 'Orders' },
];

const SideNav = () => {
    const pathname = usePathname();

    return (
        <div className="w-64 h-screen bg-gray-800 text-white p-4">
            <div className="text-2xl font-bold mb-8">Smart eCommerce</div>
            <nav>
                <ul>
                    {navLinks.map((link) => {
                        const isActive = pathname.startsWith(link.href);
                        return (
                            <li key={link.label} className="mb-2">
                                <Link href={link.href}>
                                    <span className={`px-4 py-2 block rounded-md ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
                                        {link.label}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};

export default SideNav;
