import BookingForm from '@/components/BookingForm';
import { Suspense } from 'react';

export default function OrderPage() {
    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <Suspense fallback={<div>Loading form...</div>}>
                <BookingForm />
            </Suspense>
        </div>
    );
}
