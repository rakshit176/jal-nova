import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="jalnova-footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <div className="footer-brand">
                            <h3 className="footer-logo">Jalnova</h3>
                            <p className="footer-tagline">Pure Water, Pure Life</p>
                        </div>
                        <p className="footer-description">
                            Delivering premium mineral water to your doorstep with quality you can trust.
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-title">Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/#products">Products</Link></li>
                            <li><Link href="/#contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-title">Products</h4>
                        <ul className="footer-links">
                            <li><Link href="/#products">Mineral Water</Link></li>
                            <li><Link href="/#products">Sparkling Water</Link></li>
                            <li><Link href="/#products">Family Packs</Link></li>
                            <li><Link href="/#products">Delivery Service</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-title">Contact Info</h4>
                        <div className="footer-contact">
                            <div className="contact-item">
                                <span className="contact-icon">📧</span>
                                <span>info@jalnova.com</span>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon">📞</span>
                                <span>+91 87921 97227</span>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon">📍</span>
                                <span>123 Water Street, Aqua City</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-bottom-left">
                        <p className="copyright">
                            © {currentYear} Jalnova Water Company. All rights reserved.
                        </p>
                    </div>
                    <div className="footer-bottom-right">
                        <div className="footer-social">
                            <span className="social-text">Follow us:</span>
                            <a href="#" className="social-link" aria-label="Facebook">
                                <span>f</span>
                            </a>
                            <a href="#" className="social-link" aria-label="Twitter">
                                <span>𝕏</span>
                            </a>
                            <a href="#" className="social-link" aria-label="Instagram">
                                <span>📷</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-wave">
                    <div className="wave"></div>
                    <div className="wave wave-delay-1"></div>
                    <div className="wave wave-delay-2"></div>
                </div>
            </div>
        </footer>
    );
}