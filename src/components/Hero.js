import Link from 'next/link';

export default function Hero() {
    return (
        <section className="hero">
            <div className="container hero-content">
                <h1>Pure Hydration,<br />Delivered.</h1>
                <p>Experience the crisp taste of Jalnova mineral water. Sourced from pristine aquifers, bottled for your wellness.</p>
                <div className="hero-btns">
                    <Link href="/#products" className="btn btn-primary">Order Now</Link>
                    <Link href="/#contact" className="btn btn-outline">Contact Us</Link>
                </div>
            </div>
        </section>
    );
}
