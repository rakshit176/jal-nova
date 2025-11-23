export default function AboutPage() {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <h1>About Jalnova</h1>
                    <p className="tagline">Delivering Pure Hydration Since Day One</p>
                </div>
            </section>

            {/* CEO Section */}
            <section className="ceo-section">
                <div className="container">
                    <div className="ceo-content">
                        <div className="ceo-image">
                            <div className="ceo-avatar">YS</div>
                        </div>
                        <div className="ceo-info">
                            <h2>Leadership</h2>
                            <h3>Yashobanta Sahoo</h3>
                            <p className="ceo-title">Chief Executive Officer</p>
                            <p className="ceo-bio">
                                Under the visionary leadership of Yashobanta Sahoo, Jalnova has grown to become
                                a trusted name in premium mineral water supply. With a commitment to quality and
                                sustainability, our CEO has steered the company towards excellence, ensuring every
                                drop meets the highest standards of purity.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="mission-section">
                <div className="container">
                    <h2>Our Mission</h2>
                    <p>
                        At Jalnova, we believe that access to pure, safe drinking water is a fundamental right.
                        Our mission is to provide premium quality mineral water sourced from pristine aquifers,
                        ensuring every customer receives the best hydration experience.
                    </p>
                </div>
            </section>

            {/* Customer Success Stories */}
            <section className="customers-section">
                <div className="container">
                    <h2>Trusted by Industry Leaders</h2>
                    <p className="section-subtitle">
                        We're proud to serve some of the most respected organizations
                    </p>

                    <div className="customers-grid">
                        <div className="customer-card">
                            <div className="customer-logo">
                                <div className="logo-placeholder">GRUVE INC</div>
                            </div>
                            <h3>Gruve Inc</h3>
                            <p className="customer-type">Technology Partner</p>
                            <p className="customer-testimonial">
                                "Jalnova has been our trusted water supplier for over 2 years. Their commitment
                                to quality and timely delivery has made them an invaluable partner for our offices."
                            </p>
                            <div className="customer-stats">
                                <div className="stat">
                                    <span className="stat-number">500+</span>
                                    <span className="stat-label">Employees Served</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">2+</span>
                                    <span className="stat-label">Years Partnership</span>
                                </div>
                            </div>
                        </div>

                        <div className="customer-card featured">
                            <div className="featured-badge">Premium Partner</div>
                            <div className="customer-logo">
                                <div className="logo-placeholder tata">TATA</div>
                            </div>
                            <h3>Tata Group</h3>
                            <p className="customer-type">Enterprise Client</p>
                            <p className="customer-testimonial">
                                "Quality and reliability are paramount for us. Jalnova consistently delivers
                                premium mineral water that meets our stringent standards across all our facilities."
                            </p>
                            <div className="customer-stats">
                                <div className="stat">
                                    <span className="stat-number">2000+</span>
                                    <span className="stat-label">Employees Served</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">5+</span>
                                    <span className="stat-label">Locations</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section">
                <div className="container">
                    <h2>Our Values</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <div className="value-icon">💧</div>
                            <h3>Purity</h3>
                            <p>Every drop is filtered and tested to ensure the highest quality standards</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">🌱</div>
                            <h3>Sustainability</h3>
                            <p>Committed to eco-friendly practices and responsible water sourcing</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">🚚</div>
                            <h3>Reliability</h3>
                            <p>On-time delivery and consistent service you can count on</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">⭐</div>
                            <h3>Excellence</h3>
                            <p>Striving for excellence in every aspect of our business</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
