'use client';

import { useState } from 'react';

export default function OrderTable({ initialOrders }) {
    const [orders, setOrders] = useState(initialOrders);

    const updateStatus = async (id, newStatus) => {
        try {
            const res = await fetch(`/api/orders/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
            }
        } catch (error) {
            console.error('Failed to update status', error);
        }
    };

    return (
        <div className="order-table-container">
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>#{order.id}</td>
                            <td>
                                <div className="customer-name">{order.customerName}</div>
                                <div className="customer-email">{order.customerEmail}</div>
                            </td>
                            <td>
                                {order.items.map(item => (
                                    <div key={item.id}>
                                        {item.product.name} x {item.quantity}
                                    </div>
                                ))}
                            </td>
                            <td>₹{order.totalAmount.toFixed(2)}</td>
                            <td>
                                <span className={`status-badge ${order.status.toLowerCase()}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td>
                                <select
                                    value={order.status}
                                    onChange={(e) => updateStatus(order.id, e.target.value)}
                                    className="status-select"
                                >
                                    <option value="PENDING">Pending</option>
                                    <option value="SHIPPED">Shipped</option>
                                    <option value="DELIVERED">Delivered</option>
                                    <option value="CANCELLED">Cancelled</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
