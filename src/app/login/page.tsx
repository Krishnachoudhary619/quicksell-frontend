
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/api/api-service';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const LoginPage = () => {
    const [phone, setPhone] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSendOtp = async () => {
        setLoading(true);
        setError(null);

        const response = await api.auth.sendOtp(phone);

        if (response.success) {
            router.push(`/otp?phone=${encodeURIComponent(phone)}`);
        } else {
            setError(response.message || 'An unexpected error occurred.');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
                <div className="text-center mb-6">
                    {/* Placeholder for App Logo */}
                    <div className="w-16 h-16 bg-gray-300 mx-auto rounded-full"></div>
                </div>
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <div className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Enter Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={loading}
                    />
                    <Button onClick={handleSendOtp} disabled={loading}>
                        {loading ? 'Sending OTP...' : 'Send OTP'}
                    </Button>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
