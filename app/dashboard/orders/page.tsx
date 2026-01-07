
import OrderList from '@/components/orders/OrderList';

const OrdersPage = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
            <OrderList />
        </div>
    );
};

export default OrdersPage;
