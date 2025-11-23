'use client';

import Link from 'next/link';

export default function ProductCard({ product }) {
    const getImageSrc = () => {
        // If we have a thumbnail, use it
        if (product.thumbnail) {
            return product.thumbnail;
        }
        // If we have image data (base64), use it
        if (product.imageData) {
            return product.imageData;
        }
        // If image is a base64 string
        if (product.image && product.image.startsWith('data:')) {
            return product.image;
        }
        // Otherwise use placeholder
        return null;
    };

    const imageSrc = getImageSrc();

    return (
        <div className="product-card">
            <div className="product-image">
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={product.name}
                        className="product-img"
                    />
                ) : (
                    <div className="placeholder-img">{product.name[0]}</div>
                )}
            </div>
            <div className="product-info">
                <h3>{product.name}</h3>
                <p className="desc">{product.description}</p>
                <div className="price-row">
                    <span className="price">₹{product.price.toFixed(2)}</span>
                    <Link href={`/order?productId=${product.id}`} className="btn btn-sm">
                        Book Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
