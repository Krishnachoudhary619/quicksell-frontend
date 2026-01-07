
import AuthGuard from '@/auth/auth.guard';

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
    return <AuthGuard>{children}</AuthGuard>;
};

export default ProductsLayout;
