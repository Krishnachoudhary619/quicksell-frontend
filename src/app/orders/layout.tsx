
import AuthGuard from '@/auth/auth.guard';

const OrdersLayout = ({ children }: { children: React.ReactNode }) => {
    return <AuthGuard>{children}</AuthGuard>;
};

export default OrdersLayout;
