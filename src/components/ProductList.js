import prisma from '@/lib/prisma';
import HorizontalProductScroll from './HorizontalProductScroll';

export default async function ProductList() {
    const products = await prisma.product.findMany();

    return (
        <section id="products" className="products-section">
            <div className="container">
                <h2 className="section-title">Our Products</h2>
                <HorizontalProductScroll products={products} />
            </div>
        </section>
    );
}
