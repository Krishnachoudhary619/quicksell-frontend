
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/api/api-service';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const OtpPage = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();

    const handleVerifyOtp = async () => {
        setLoading(true);
        setError(null);

        const phone = searchParams.get('phone');

        if (!phone) {
            setError('Phone number not found.');
            setLoading(false);
            return;
        }

        const response = await api.auth.verifyOtp(phone, otp);

        if (response.success && response.data) {
            login(response.data.user, response.data.accessToken, response.data.refreshToken);
            router.push('/products'); // Redirect to a protected route
        } else {
            setError(response.message || 'An unexpected error occurred.');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Verify OTP</h2>
                <div className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        disabled={loading}
                    />
                    <Button onClick={handleVerifyOtp} disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify'}
                    </Button>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default OtpPage;

