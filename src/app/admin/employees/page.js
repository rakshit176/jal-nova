'use client';

import { useState, useEffect } from 'react';
import ConfirmModal from '@/components/ui/ConfirmModal';
import AlertModal from '@/components/ui/AlertModal';

export default function EmployeesPage() {
    const [employees, setEmployees] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', role: 'Staff' });
    const [alertModal, setAlertModal] = useState({ show: false, type: 'success', title: '', message: '' });
    const [deleteConfirm, setDeleteConfirm] = useState({ show: false, employeeId: null, employeeName: '' });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const showAlert = (type, title, message) => {
        setAlertModal({ show: true, type, title, message });
    };

    const hideAlert = () => {
        setAlertModal({ show: false, type: 'success', title: '', message: '' });
    };

    const handleEditClick = (employee) => {
        setFormData({
            name: employee.name,
            email: employee.email,
            role: employee.role
        });
        setEditingId(employee.id);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDeleteClick = (id, name) => {
        setDeleteConfirm({ show: true, employeeId: id, employeeName: name });
    };

    const confirmDelete = async () => {
        const { employeeId } = deleteConfirm;

        try {
            const res = await fetch(`/api/employees?id=${employeeId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                showAlert('success', 'Success!', 'Employee deleted successfully!');
                fetchEmployees();
            } else {
                const data = await res.json();
                showAlert('error', 'Error', `Failed to delete employee: ${data.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error(error);
            showAlert('error', 'Error', 'Failed to delete employee. Please try again.');
        } finally {
            setDeleteConfirm({ show: false, employeeId: null, employeeName: '' });
        }
    };

    const cancelDelete = () => {
        setDeleteConfirm({ show: false, employeeId: null, employeeName: '' });
    };

    const resetForm = () => {
        setFormData({ name: '', email: '', role: 'Staff' });
        setEditingId(null);
        setIsEditing(false);
        setShowForm(false);
    };

    const fetchEmployees = async () => {
        try {
            const res = await fetch('/api/employees');
            if (res.ok) {
                const data = await res.json();
                setEmployees(data);
            }
        } catch (error) {
            console.error('Failed to fetch employees:', error);
            showAlert('error', 'Error', 'Failed to fetch employees. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = isEditing ? `/api/employees/${editingId}` : '/api/employees';
            const method = isEditing ? 'PATCH' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const updatedEmployee = await res.json();

                if (isEditing) {
                    setEmployees(employees.map(emp =>
                        emp.id === editingId ? updatedEmployee : emp
                    ));
                    showAlert('success', 'Success!', 'Employee updated successfully!');
                } else {
                    setEmployees([...employees, updatedEmployee]);
                    showAlert('success', 'Success!', 'Employee added successfully!');
                }

                resetForm();
            } else {
                const data = await res.json();
                const action = isEditing ? 'update' : 'add';
                showAlert('error', 'Error', `Failed to ${action} employee: ${data.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error(error);
            showAlert('error', 'Error', `Failed to ${isEditing ? 'update' : 'add'} employee. Please try again.`);
        }
    };

    return (
        <div className="modern-page">
            <div className="page-header-modern">
                <div>
                    <h1>Employee Management</h1>
                    <p className="subtitle">Manage your team members</p>
                </div>
                <button
                    className={`btn-modern ${showForm ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={() => {
                        if (showForm) {
                            resetForm();
                        } else {
                            setShowForm(true);
                        }
                    }}
                >
                    {showForm ? '✕ Cancel' : '+ Add Employee'}
                </button>
            </div>

            {showForm && (
                <div className="modern-card slide-in">
                    <h2 className="card-title">{isEditing ? 'Edit Employee' : 'New Employee'}</h2>
                    <form onSubmit={handleSubmit} className="modern-form">
                        <div className="form-row">
                            <div className="input-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john@jalnova.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Role</label>
                            <select
                                value={formData.role}
                                onChange={e => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option>Manager</option>
                                <option>Delivery Driver</option>
                                <option>Support Staff</option>
                            </select>
                        </div>

                        <button type="submit" className="btn-modern btn-primary full-width">
                            {isEditing ? 'Update Employee' : 'Add Employee'}
                        </button>
                    </form>
                </div>
            )}

            <div className="modern-card">
                <div className="table-container">
                    <table className="modern-table">
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Joined</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(emp => (
                                <tr key={emp.id}>
                                    <td>
                                        <div className="employee-cell">
                                            <div className="avatar">{emp.name[0].toUpperCase()}</div>
                                            <div>
                                                <div className="emp-name">{emp.name}</div>
                                                <div className="emp-email">{emp.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="role-badge">{emp.role}</span>
                                    </td>
                                    <td>
                                        <span className="status-badge status-active">{emp.status}</span>
                                    </td>
                                    <td className="date-cell">
                                        {new Date(emp.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td>
                                        <div className="actions-cell">
                                            <button
                                                onClick={() => handleEditClick(emp)}
                                                className="btn-modern btn-secondary btn-sm"
                                                title="Edit Employee"
                                            >
                                                ✏️ Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(emp.id, emp.name)}
                                                className="btn-modern btn-primary btn-sm btn-delete"
                                                title="Delete Employee"
                                            >
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {employees.length === 0 && (
                        <div className="empty-state-modern">
                            <div className="empty-icon">👥</div>
                            <h3>No employees yet</h3>
                            <p>Add your first team member to get started</p>
                        </div>
                    )}
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

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={deleteConfirm.show}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                title="Delete Employee"
                type="danger"
                confirmText="Delete Employee"
                cancelText="Cancel"
                message={
                    <div>
                        <p>Are you sure you want to delete this employee?</p>
                        <div className="employee-info">
                            <strong>{deleteConfirm.employeeName}</strong>
                        </div>
                        <p className="warning-text">
                            This action cannot be undone and will remove all employee records.
                        </p>
                    </div>
                }
            />
        </div>
    );
}
