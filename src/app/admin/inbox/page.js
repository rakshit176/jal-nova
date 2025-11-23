'use client';

import { useState, useEffect } from 'react';
import ConfirmModal from '@/components/ui/ConfirmModal';
import AlertModal from '@/components/ui/AlertModal';

export default function InboxPage() {
    const [messages, setMessages] = useState([]);
    const [deleteConfirm, setDeleteConfirm] = useState({ show: false, messageId: null, senderName: '' });
    const [alertModal, setAlertModal] = useState({ show: false, type: 'success', title: '', message: '' });

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await fetch('/api/contact');
            if (res.ok) {
                const data = await res.json();
                setMessages(data);
            }
        } catch (error) {
            console.error('Failed to fetch messages:', error);
            showAlert('error', 'Error', 'Failed to fetch messages. Please try again.');
        }
    };

    const showAlert = (type, title, message) => {
        setAlertModal({ show: true, type, title, message });
    };

    const hideAlert = () => {
        setAlertModal({ show: false, type: 'success', title: '', message: '' });
    };

    const handleDeleteClick = (id, name) => {
        setDeleteConfirm({ show: true, messageId: id, senderName: name });
    };

    const confirmDelete = async () => {
        const { messageId } = deleteConfirm;

        try {
            const res = await fetch(`/api/contact/${messageId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                showAlert('success', 'Success!', 'Message deleted successfully!');
                fetchMessages();
            } else {
                const data = await res.json();
                showAlert('error', 'Error', `Failed to delete message: ${data.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error(error);
            showAlert('error', 'Error', 'Failed to delete message. Please try again.');
        } finally {
            setDeleteConfirm({ show: false, messageId: null, senderName: '' });
        }
    };

    const cancelDelete = () => {
        setDeleteConfirm({ show: false, messageId: null, senderName: '' });
    };

    const markAsRead = async (id) => {
        try {
            const res = await fetch(`/api/contact/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ read: true }),
            });

            if (res.ok) {
                setMessages(messages.map(msg =>
                    msg.id === id ? { ...msg, read: true } : msg
                ));
            }
        } catch (error) {
            console.error('Failed to mark as read:', error);
        }
    };

    const unreadCount = messages.filter(m => !m.read).length;

    return (
        <div className="modern-page">
            <div className="page-header-modern">
                <div>
                    <h1>Inbox</h1>
                    <p className="subtitle">{unreadCount} unread messages</p>
                </div>
            </div>

            <div className="inbox-container">
                {messages.length === 0 ? (
                    <div className="empty-state-modern">
                        <div className="empty-icon">📭</div>
                        <h3>No messages yet</h3>
                        <p>Customer messages will appear here</p>
                    </div>
                ) : (
                    <div className="messages-list">
                        {messages.map(msg => (
                            <div
                                key={msg.id}
                                className={`message-card ${msg.read ? 'read' : 'unread'}`}
                                onClick={() => !msg.read && markAsRead(msg.id)}
                            >
                                <div className="message-header">
                                    <div className="sender-info">
                                        <div className="avatar">{msg.name[0].toUpperCase()}</div>
                                        <div>
                                            <h4>{msg.name}</h4>
                                            <span className="email-text">{msg.email}</span>
                                        </div>
                                    </div>
                                    <div className="message-meta">
                                        <span className="date-badge">
                                            {new Date(msg.createdAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                        {!msg.read && <span className="unread-dot"></span>}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteClick(msg.id, msg.name);
                                            }}
                                            className="btn-modern btn-primary btn-sm btn-delete"
                                            title="Delete Message"
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </div>
                                <div className="message-content">
                                    {msg.message}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Alert Modal */}
            <AlertModal
                isOpen={alertModal.show}
                onClose={hideAlert}
                title={alertModal.title}
                message={alertModal.message}
                type={alertModal.type}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={deleteConfirm.show}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                title="Delete Message"
                type="danger"
                confirmText="Delete Message"
                cancelText="Cancel"
                message={
                    <div>
                        <p>Are you sure you want to delete this message?</p>
                        <div className="employee-info">
                            <strong>{deleteConfirm.senderName}</strong>
                        </div>
                        <p className="warning-text">
                            This action cannot be undone and will permanently remove the message.
                        </p>
                    </div>
                }
            />
        </div>
    );
}
