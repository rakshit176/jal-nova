import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link href="/" className="logo">
                    JALNOVA
                </Link>
                <div className="nav-links">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/#products">Products</Link>
                    <Link href="/#contact">Contact</Link>
                </div>
            </div>
        </nav>
    );
}
