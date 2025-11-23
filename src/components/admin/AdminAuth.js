'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminAuth({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showLogoutAlert, setShowLogoutAlert] = useState(false);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
        try {
            const session = localStorage.getItem('adminSession');

            if (!session) {
                router.push('/admin/login');
                return;
            }

            const parsedSession = JSON.parse(session);

            // Check if session has expired
            if (Date.now() > parsedSession.expiresAt) {
                localStorage.removeItem('adminSession');
                router.push('/admin/login');
                return;
            }

            setIsAuthenticated(true);
        } catch (error) {
            console.error('Auth check error:', error);
            localStorage.removeItem('adminSession');
            router.push('/admin/login');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminSession');
        setShowLogoutAlert(true);
        setTimeout(() => {
            router.push('/admin/login');
        }, 2000);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-color)' }}>
                <div className="container">
                    <div className="auth-loading">
                        <div className="auth-loading-spinner">
                            <div className="water-drop"></div>
                        </div>
                        <h2 className="auth-loading-title">Jalnova</h2>
                        <p className="auth-loading-text">Verifying admin access...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-color)' }}>
                <div className="container">
                    <div className="auth-loading">
                        <div className="auth-loading-spinner">
                            <div className="water-drop"></div>
                        </div>
                        <h2 className="auth-loading-title">Redirecting...</h2>
                        <p className="auth-loading-text">Please wait while we redirect you to login.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Admin Header */}
            <header className="admin-header">
                <div className="admin-header-content">
                    <div className="admin-header-left">
                        <div className="admin-logo">
                            <div className="logo-icon">💧</div>
                            <div className="logo-text">
                                <h1 className="logo-title">Jalnova Admin</h1>
                                <p className="logo-subtitle">Pure Water, Pure Management</p>
                            </div>
                        </div>
                        <div className="admin-badge">
                            <span className="badge-icon">🔐</span>
                            <span className="badge-text">Authorized Access</span>
                        </div>
                    </div>
                    <div className="admin-header-right">
                        <a
                            href="/"
                            className="btn-modern btn-outline view-site-btn"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>🌐</span>
                            View Website
                        </a>
                        <button
                            onClick={handleLogout}
                            className="btn-modern btn-primary logout-btn"
                        >
                            <span>🚪</span>
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Admin Content */}
            <main className="admin-main">
                {children}
            </main>

            {/* Logout Success Alert */}
            {showLogoutAlert && (
                <div className="logout-overlay">
                    <div className="logout-modal">
                        <div className="logout-icon">✅</div>
                        <h3 className="logout-title">Logged Out Successfully</h3>
                        <p className="logout-message">Thank you for managing Jalnova. Stay hydrated!</p>
                        <div className="logout-ripple"></div>
                    </div>
                </div>
            )}
        </>
    );
}