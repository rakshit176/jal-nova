'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AlertModal from '@/components/ui/AlertModal';

export default function AdminLogin() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [alertModal, setAlertModal] = useState({ show: false, type: 'error', title: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const showAlert = (type, title, message) => {
        setAlertModal({ show: true, type, title, message });
    };

    const hideAlert = () => {
        setAlertModal({ show: false, type: 'error', title: '', message: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            const data = await res.json();

            if (res.ok) {
                // Store admin session in localStorage
                localStorage.setItem('adminSession', JSON.stringify({
                    token: data.token,
                    username: data.username,
                    expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
                }));

                showAlert('success', 'Login Successful!', 'Welcome to the admin panel.');

                // Redirect to dashboard after a short delay
                setTimeout(() => {
                    router.push('/admin/dashboard');
                }, 1500);
            } else {
                showAlert('error', 'Login Failed', data.error || 'Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            showAlert('error', 'Login Failed', 'Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-color)' }}>
            <div className="container">
                <div className="auth-container">
                    <div className="auth-header">
                        <div className="auth-logo">
                            <h1 className="auth-title">Jalnova</h1>
                            <p className="auth-subtitle">Pure Water, Pure Life</p>
                        </div>
                        <div className="auth-divider">
                            <div className="divider-line"></div>
                            <span className="divider-text">Admin Portal</span>
                            <div className="divider-line"></div>
                        </div>
                    </div>

                    <div className="modern-card auth-card">
                        <div className="auth-header-content">
                            <h2 className="auth-heading">Welcome Back</h2>
                            <p className="auth-description">Sign in to access the admin dashboard</p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <label htmlFor="username" className="form-label">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    required
                                    value={credentials.username}
                                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                    className="form-input"
                                    placeholder="Enter your username"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={credentials.password}
                                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                    className="form-input"
                                    placeholder="Enter your password"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`btn-modern btn-primary auth-button ${isLoading ? 'loading' : ''}`}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner"></span>
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign In to Admin Panel'
                                )}
                            </button>
                        </form>

                        <div className="auth-security-notice">
                            <div className="security-icon">🔐</div>
                            <div className="security-content">
                                <p className="security-title">Authorized Access Only</p>
                                <p className="security-description">
                                    This area is restricted to authorized personnel. All access attempts are logged.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="auth-footer">
                        <p className="footer-text">
                            <span className="brand-name">Jalnova</span> Water Delivery System
                        </p>
                        <p className="footer-version">Admin Portal v1.0</p>
                    </div>
                </div>
            </div>

            {/* Alert Modal */}
            <AlertModal
                isOpen={alertModal.show}
                onClose={hideAlert}
                title={alertModal.title}
                message={alertModal.message}
                type={alertModal.type}
            />
        </div>
    );
}