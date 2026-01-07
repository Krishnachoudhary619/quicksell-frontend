
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { listOrders } from '@/api/orders.api';

const OrderList = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await listOrders({});
                if (response.success) {
                    setOrders(response.data);
                } else {
                    setError(response.message);
                }
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <p>Loading orders...</p>;
    }

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    if (orders.length === 0) {
        return <p>No orders found.</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-3 px-6 text-left">Order ID</th>
                        <th className="py-3 px-6 text-left">Customer</th>
                        <th className="py-3 px-6 text-left">Date</th>
                        <th className="py-3 px-6 text-left">Status</th>
                        <th className="py-3 px-6 text-right">Total</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td className="py-4 px-6">#{order.id}</td>
                            <td className="py-4 px-6">{order.customerName}</td>
                            <td className="py-4 px-6">{new Date(order.orderDate).toLocaleDateString()}</td>
                            <td className="py-4 px-6">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                                    ${order.status === 'Shipped' ? 'bg-blue-200 text-blue-800' : ''}
                                    ${order.status === 'Processing' ? 'bg-yellow-200 text-yellow-800' : ''}
                                    ${order.status === 'Delivered' ? 'bg-green-200 text-green-800' : ''}
                                `}>
                                    {order.status}
                                </span>
                            </td>
                            <td className="py-4 px-6 text-right">${order.total.toFixed(2)}</td>
                            <td className="py-4 px-6 text-center">
                                <Link href={`/dashboard/orders/${order.id}'}>
                                    <span className="text-indigo-600 hover:text-indigo-900 cursor-pointer">View</span>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;
