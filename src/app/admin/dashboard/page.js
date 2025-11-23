import prisma from '@/lib/prisma';
import OrderTable from '@/components/admin/OrderTable';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const orders = await prisma.order.findMany({
        include: {
            items: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const messageCount = await prisma.contactMessage.count({
        where: { read: false }
    });

    return (
        <div className="container" style={{ padding: '2rem' }}>
            <h1 className="section-title">Admin Dashboard</h1>

            <div className="dashboard-stats">
                <div className="stat-card">
                    <h3>Total Orders</h3>
                    <p className="stat-value">{orders.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Pending</h3>
                    <p className="stat-value">{orders.filter(o => o.status === 'PENDING').length}</p>
                </div>
                <div className="stat-card">
                    <h3>Revenue</h3>
                    <p className="stat-value">₹{orders.reduce((acc, o) => acc + o.totalAmount, 0).toFixed(2)}</p>
                </div>
            </div>

            <div className="quick-actions">
                <Link href="/admin/products" className="action-card">
                    <h3>Manage Products</h3>
                    <p>Add, edit, or update stock</p>
                </Link>
                <Link href="/admin/inbox" className="action-card">
                    <h3>Inbox</h3>
                    <p>{messageCount} unread messages</p>
                </Link>
                <Link href="/admin/employees" className="action-card">
                    <h3>Employees</h3>
                    <p>Manage staff and roles</p>
                </Link>
            </div>

            <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Recent Orders</h2>
            <OrderTable initialOrders={orders} />
        </div>
    );
}
