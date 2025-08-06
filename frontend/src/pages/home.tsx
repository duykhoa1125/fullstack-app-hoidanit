import { Link } from "react-router-dom";
import { UserOutlined, SafetyOutlined, ThunderboltOutlined } from "@ant-design/icons";

const HomePage = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <h1 className="hero-title">Welcome to FullStack App</h1>
                    <p className="hero-subtitle">
                        A modern, secure, and powerful full-stack application built with React and TypeScript
                    </p>
                    <div className="hero-buttons">
                        <Link to="/register" className="hero-btn hero-btn-primary">
                            Get Started
                        </Link>
                        <Link to="/login" className="hero-btn hero-btn-secondary">
                            Sign In
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2 className="features-title">Why Choose Our Platform?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <SafetyOutlined />
                            </div>
                            <h3 className="feature-title">Secure & Reliable</h3>
                            <p className="feature-description">
                                Built with industry-standard security practices including JWT authentication,
                                password hashing, and secure API endpoints.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <ThunderboltOutlined />
                            </div>
                            <h3 className="feature-title">Fast & Modern</h3>
                            <p className="feature-description">
                                Powered by React 19, TypeScript, and Vite for lightning-fast development
                                and optimal performance in production.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <UserOutlined />
                            </div>
                            <h3 className="feature-title">User-Friendly</h3>
                            <p className="feature-description">
                                Intuitive interface designed with Ant Design components for the best
                                user experience across all devices.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;