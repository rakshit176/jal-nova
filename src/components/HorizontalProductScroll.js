'use client';

import { useState, useRef, useEffect } from 'react';
import ProductCard from './ProductCard';

export default function HorizontalProductScroll({ products }) {
    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // Determine alignment based on product count
    const getAlignmentConfig = () => {
        const count = products.length;

        if (count === 0) return { alignment: 'empty', needsScroll: false };
        if (count === 1) return { alignment: 'single', needsScroll: false };
        if (count === 2) return { alignment: 'double', needsScroll: false };
        return { alignment: 'many', needsScroll: true };
    };

    const { alignment, needsScroll } = getAlignmentConfig();

    const checkScrollButtons = () => {
        const container = scrollContainerRef.current;
        if (container) {
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(
                container.scrollLeft < container.scrollWidth - container.clientWidth
            );
        }
    };

    const scrollLeft = () => {
        const container = scrollContainerRef.current;
        if (container) {
            container.scrollBy({ left: -320, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        const container = scrollContainerRef.current;
        if (container) {
            container.scrollBy({ left: 320, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container && needsScroll) {
            // Check scroll buttons on mount
            checkScrollButtons();

            // Add scroll event listener
            container.addEventListener('scroll', checkScrollButtons);

            // Check scroll buttons on resize
            window.addEventListener('resize', checkScrollButtons);

            return () => {
                container.removeEventListener('scroll', checkScrollButtons);
                window.removeEventListener('resize', checkScrollButtons);
            };
        }
    }, [products, needsScroll]);

    if (!products || products.length === 0) {
        return (
            <div className="horizontal-products-container alignment-empty">
                <div className="products-header">
                    <h3 className="products-subtitle">Premium Water Collection</h3>
                </div>
                <div className="empty-products">
                    <p>No products available at the moment.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`horizontal-products-container alignment-${alignment}`}>
            <div className="products-header">
                <h3 className="products-subtitle">Premium Water Collection</h3>
                {needsScroll && (
                    <div className="scroll-controls">
                        <button
                            onClick={scrollLeft}
                            disabled={!canScrollLeft}
                            className={`scroll-btn scroll-left ${canScrollLeft ? 'active' : 'disabled'}`}
                            aria-label="Scroll left"
                        >
                            ←
                        </button>
                        <button
                            onClick={scrollRight}
                            disabled={!canScrollRight}
                            className={`scroll-btn scroll-right ${canScrollRight ? 'active' : 'disabled'}`}
                            aria-label="Scroll right"
                        >
                            →
                        </button>
                    </div>
                )}
            </div>

            <div
                className={`horizontal-scroll-wrapper ${needsScroll ? 'scrollable' : 'static'}`}
                ref={scrollContainerRef}
            >
                <div className={`horizontal-products-track alignment-${alignment}`}>
                    {products.map((product) => (
                        <div key={product.id} className="horizontal-product-item">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll indicators - only show when scrolling is needed */}
            {needsScroll && (
                <div className="scroll-indicators">
                    <div className="scroll-progress"></div>
                </div>
            )}
        </div>
    );
}