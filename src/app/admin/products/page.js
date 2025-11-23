'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ConfirmModal from '@/components/ui/ConfirmModal';
import AlertModal from '@/components/ui/AlertModal';
import ImageUpload from '@/components/ui/ImageUpload';

export default function ProductsPage() {
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);
    const [products, setProducts] = useState([]);
    const [deleteConfirm, setDeleteConfirm] = useState({ show: false, productId: null, productName: '' });
    const [alertModal, setAlertModal] = useState({ show: false, type: 'success', title: '', message: '' });
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: '/images/bottle-500ml.png',
        imageData: null,
        thumbnail: null,
        stock: 100
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            }
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setShowForm(false);
                fetchProducts();
                router.refresh();
                setFormData({
                name: '',
                description: '',
                price: '',
                image: '/images/bottle-500ml.png',
                imageData: null,
                thumbnail: null,
                stock: 100
            });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteClick = (id, name) => {
        setDeleteConfirm({ show: true, productId: id, productName: name });
    };

    const confirmDelete = async () => {
        const { productId } = deleteConfirm;

        try {
            const res = await fetch(`/api/products?id=${productId}`, {
                method: 'DELETE',
            });

            const data = await res.json();

            if (res.ok) {
                showAlert('success', 'Success!', 'Product deleted successfully!');
                fetchProducts();
                router.refresh();
            } else {
                showAlert('error', 'Error', `Failed to delete product: ${data.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error(error);
            showAlert('error', 'Error', 'Failed to delete product. Please try again.');
        } finally {
            setDeleteConfirm({ show: false, productId: null, productName: '' });
        }
    };

    const cancelDelete = () => {
        setDeleteConfirm({ show: false, productId: null, productName: '' });
    };

    const showAlert = (type, title, message) => {
        setAlertModal({ show: true, type, title, message });
    };

    const hideAlert = () => {
        setAlertModal({ show: false, type: 'success', title: '', message: '' });
    };

    const handleImageSelect = (imageData) => {
        if (imageData) {
            setFormData(prev => ({
                ...prev,
                image: imageData.base64,
                imageData: imageData.base64,
                thumbnail: imageData.thumbnail
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                image: '/images/bottle-500ml.png',
                imageData: null,
                thumbnail: null
            }));
        }
    };

    return (
        <div className="modern-page">
            <div className="page-header-modern">
                <div>
                    <h1>Product Management</h1>
                    <p className="subtitle">Manage your water product catalog</p>
                </div>
                <button
                    className={`btn-modern ${showForm ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? '✕ Cancel' : '+ Add New Product'}
                </button>
            </div>

            {showForm && (
                <div className="modern-card slide-in">
                    <h2 className="card-title">New Product</h2>
                    <form onSubmit={handleSubmit} className="modern-form">
                        <div className="form-row">
                            <div className="input-group">
                                <label>Product Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Jalnova Pure 500ml"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>Price (INR)</label>
                                <div className="input-with-icon">
                                    <span className="input-icon">₹</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="12.00"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <label>Stock Quantity</label>
                                <input
                                    type="number"
                                    placeholder="100"
                                    value={formData.stock}
                                    onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>Product Image</label>
                                <ImageUpload
                                    onImageSelect={handleImageSelect}
                                    currentImage={formData.imageData || (formData.image.startsWith('data:') ? formData.image : null)}
                                    maxSize={5 * 1024 * 1024} // 5MB
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Description</label>
                            <textarea
                                placeholder="Describe your product..."
                                rows="3"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="btn-modern btn-primary full-width">
                            Save Product
                        </button>
                    </form>
                </div>
            )}

            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card-modern">
                        <div className="product-image-modern">
                            {product.thumbnail || (product.imageData || (product.image && product.image.startsWith('data:'))) ? (
                                <img
                                    src={product.thumbnail || product.imageData || product.image}
                                    alt={product.name}
                                    className="admin-product-img"
                                />
                            ) : (
                                <div className="placeholder-img">{product.name[0]}</div>
                            )}
                        </div>
                        <div className="product-details">
                            <h3>{product.name}</h3>
                            <p className="product-desc">{product.description}</p>
                            <div className="product-meta">
                                <span className="price-tag">₹{product.price.toFixed(2)}</span>
                                <span className="stock-badge">Stock: {product.stock}</span>
                            </div>
                            <button
                                onClick={() => handleDeleteClick(product.id, product.name)}
                                className="btn-delete"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={deleteConfirm.show}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                title="Delete Product"
                type="danger"
                confirmText="Delete Product"
                cancelText="Cancel"
                message={
                    <div>
                        <p>Are you sure you want to delete this product?</p>
                        <div className="product-info">
                            <strong>{deleteConfirm.productName}</strong>
                        </div>
                        <p className="warning-text">
                            This action cannot be undone and will also remove this product from all existing orders.
                        </p>
                    </div>
                }
            />

            {/* Alert Modal */}
            <AlertModal
                isOpen={alertModal.show}
                onClose={hideAlert}
                title={alertModal.title}
                message={alertModal.message}
                type={alertModal.type}
            />

            <style jsx>{`
                .product-info {
                    background: #f8f9fa;
                    padding: 1.5rem;
                    border-radius: 12px;
                    margin: 1.5rem 0;
                    border-left: 4px solid var(--secondary-color);
                    text-align: left;
                }

                .product-info strong {
                    color: var(--primary-color);
                    font-size: 1.2rem;
                    font-weight: 600;
                }

                .warning-text {
                    color: #dc2626;
                    font-size: 1rem;
                    font-weight: 500;
                    margin-top: 1.5rem;
                    line-height: 1.6;
                }

                .admin-product-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 8px;
                }

                .product-image-modern {
                    position: relative;
                    overflow: hidden;
                }

                .product-card-modern:hover .admin-product-img {
                    transform: scale(1.05);
                    transition: transform 0.3s ease;
                }
            `}</style>
        </div>
    );
}
