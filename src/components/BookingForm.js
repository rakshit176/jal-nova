'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function BookingForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const productId = searchParams.get('productId');

    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: '',
        customerAddress: '',
        quantity: 1,
        productId: productId || '',
    });

    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    useEffect(() => {
        if (productId) {
            setFormData(prev => ({ ...prev, productId }));
        }
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Failed to submit order');

            setStatus('success');
            setTimeout(() => {
                router.push('/');
            }, 3000);
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="success-message">
                <h2>Order Placed Successfully!</h2>
                <p>Thank you for choosing Jalnova. We will contact you shortly.</p>
                <p>Redirecting to home...</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="booking-form">
            <h2>Place Your Order</h2>

            <div className="form-group">
                <label>Product ID</label>
                <input
                    type="number"
                    name="productId"
                    value={formData.productId}
                    onChange={handleChange}
                    required
                    readOnly={!!productId}
                />
            </div>

            <div className="form-group">
                <label>Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Full Name</label>
                <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Delivery Address</label>
                <textarea
                    name="customerAddress"
                    value={formData.customerAddress}
                    onChange={handleChange}
                    required
                    rows="3"
                ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
                {status === 'loading' ? 'Processing...' : 'Confirm Order'}
            </button>

            {status === 'error' && <p className="error">Something went wrong. Please try again.</p>}

            <style jsx>{`
        .booking-form {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: var(--card-shadow);
          max-width: 500px;
          margin: 0 auto;
        }
        h2 {
          color: var(--primary-color);
          margin-bottom: 1.5rem;
          text-align: center;
        }
        .form-group {
          margin-bottom: 1.25rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #555;
        }
        input, textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-family: inherit;
        }
        input:focus, textarea:focus {
          outline: none;
          border-color: var(--secondary-color);
        }
        .success-message {
          text-align: center;
          padding: 3rem;
          background: #E0F7FA;
          border-radius: 16px;
          color: var(--primary-color);
        }
        .error {
          color: red;
          margin-top: 1rem;
          text-align: center;
        }
      `}</style>
        </form>
    );
}
