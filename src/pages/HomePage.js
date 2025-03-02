import React from 'react';
import './styles/HomePage.css';
import NavigationBar from "../components/Navbar";

const HomePage = () => {
  return (
    <div className="home-container">
      <NavigationBar /> 
      
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to <span className="highlight">AgriHub</span></h1>
          <p>Your one-stop solution for agriculture management</p>
          <button className="cta-button">Explore Now</button>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Our Features</h2>
        <div className="features">
          <div className="feature">
            <h3>Crop Management</h3>
            <p>Manage your crops effectively with our tools, ensuring optimal growth and harvest.</p>
          </div>
          <div className="feature">
            <h3>Weather Updates</h3>
            <p>Get real-time weather updates for your region, helping you plan your agricultural activities.</p>
          </div>
          <div className="feature">
            <h3>Market Insights</h3>
            <p>Stay informed about market trends and prices to make better decisions on crop sales.</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2 className="section-title">Our Services</h2>
        <div className="services">
          <div className="service">
            <h3>Consultation</h3>
            <p>Expert advice on crop management, pest control, and sustainable farming practices.</p>
          </div>
          <div className="service">
            <h3>Crop Disease Detection</h3>
            <p>Using advanced image processing and AI to detect diseases early and recommend treatments.</p>
          </div>
          <div className="service">
            <h3>Farming Equipment</h3>
            <p>Access to modern farming tools and machinery to improve productivity and efficiency.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="testimonials">
          <div className="testimonial">
            <p>"AgriHub has revolutionized the way I manage my farm. The weather updates and crop management tools are a game-changer!"</p>
            <h4>- Rajesh Kumar, Farmer</h4>
          </div>
          <div className="testimonial">
            <p>"The crop disease detection feature saved my crops from a potential outbreak. Highly recommended!"</p>
            <h4>- Sunita Devi, Farmer</h4>
          </div>
          <div className="testimonial">
            <p>"I love the market insights. They help me decide the best time to sell my produce for maximum profit."</p>
            <h4>- Anil Sharma, Grower</h4>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2025 AgriHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
