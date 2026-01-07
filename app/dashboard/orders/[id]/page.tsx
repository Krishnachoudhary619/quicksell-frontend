
const OrderDetailPage = ({ params }: { params: { id: string } }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Order Details</h1>
            <p>Details for order #{params.id}</p>
        </div>
    );
};

export default OrderDetailPage;
