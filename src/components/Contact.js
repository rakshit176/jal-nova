'use client';

import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Failed to send message');

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="contact-section">
            <div className="container">
                <h2 className="section-title">Get in Touch</h2>
                <div className="contact-content">
                    <div className="contact-info">
                        <h3>Jalnova Headquarters</h3>
                        <p>123 Aqua Boulevard, Spring City</p>
                        <p>Email: hello@jalnova.com</p>
                        <p>Phone: +91 87921 97227</p>
                    </div>
                    <div className="contact-form-wrapper">
                        {status === 'success' ? (
                            <div className="success-message">
                                <h3>Message Sent!</h3>
                                <p>Thank you for reaching out. We'll get back to you shortly.</p>
                                <button className="btn btn-outline" onClick={() => setStatus('idle')}>Send Another</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="contact-form">
                                <p className="form-title">Have a bulk order or query? Reach out to us.</p>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <textarea
                                        name="message"
                                        placeholder="Your Message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
                                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                                </button>

                                {status === 'error' && <p className="error-msg">Failed to send message. Please try again.</p>}
                            </form>
                        )}
                    </div>
                </div>
            </div>
            <style jsx>{`
        .contact-form-wrapper {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: var(--card-shadow);
        }
        .form-title {
          margin-bottom: 1.5rem;
          color: #555;
          text-align: center;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        input, textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-family: inherit;
          font-size: 1rem;
        }
        input:focus, textarea:focus {
          outline: none;
          border-color: var(--secondary-color);
        }
        .success-message {
          text-align: center;
          padding: 2rem;
          color: var(--primary-color);
        }
        .success-message h3 {
          margin-bottom: 1rem;
        }
        .success-message p {
          margin-bottom: 1.5rem;
        }
        .error-msg {
          color: red;
          margin-top: 1rem;
          text-align: center;
        }
        button {
          width: 100%;
        }
      `}</style>
        </section>
    );
}
