'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AdminAuth from '@/components/admin/AdminAuth';

export default function AdminLayout({ children }) {
    const pathname = usePathname();

    // Don't show admin layout for login page
    if (pathname === '/admin/login') {
        return children;
    }

    return (
        <AdminAuth>
            <div className="admin-layout">
                <aside className="admin-sidebar">
                    <div className="sidebar-header">
                        <h2>🔐 Jalnova Admin</h2>
                        <p className="text-xs text-gray-500 mt-1">Authorized Access Only</p>
                    </div>
                    <nav className="sidebar-nav">
                        <Link href="/admin/dashboard" className="nav-item">
                            📊 Dashboard
                        </Link>
                        <Link href="/admin/products" className="nav-item">
                            📦 Products
                        </Link>
                        <Link href="/admin/inbox" className="nav-item">
                            💬 Inbox
                        </Link>
                        <Link href="/admin/employees" className="nav-item">
                            👥 Employees
                        </Link>
                        <Link href="/" className="nav-item back-home" target="_blank" rel="noopener noreferrer">
                            🌐 View Website
                        </Link>
                    </nav>
                </aside>
                <main className="admin-content">
                    {children}
                </main>
            </div>
        </AdminAuth>
    );
}
