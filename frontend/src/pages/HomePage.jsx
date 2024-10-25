import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg'
import totoro from '../images/totoro.png'
import kiki from '../images/kiki.png'
import sophie from '../images/sophie.png'
import '../Homepage.css'; 

const Home = () => {
  return (
    <div id="home-page">
      <div className="home-box">
        <header className="navbar">
          <nav>
            <ul>
              <li>
                <div className="logo-container">
                  <img className="logo-img" src={logo} alt="ghifud logo" />
                </div>
              </li>
              <li><Link to=" ">About</Link></li>
              <li><Link to=" ">Contact</Link></li>
            </ul>
          </nav>
          <nav>
            <ul>
              <li><Link to="/signin">Sign In</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <section className="caption">
            <h2>Enjoy Your Food with Fastest Delivery from Ghibli</h2>
            <p>Order your food from the best restaurant and we will deliver it without taking long time.</p>
            <button className="get-started-button">Get Started</button>
          </section>

          <section className="services-section">
            <h3>Our Services</h3>
            <div className="services">
              <div className="service-item">
                <img className="img-icon1" src={totoro} alt="totoro stirring batter" />
                <p>Restaurant will give their best cuisine</p>
              </div>
              <div className="service-item">
                <img  className="img-icon2"  src={kiki} alt="kiki on the flying broom with her cat" />
                <p>Courier delivers the food quick and safe</p>
              </div>
              <div className="service-item">
                <img className="img-icon3" src={sophie} alt="sophie excited with a handbag" />
                <p>Best quality food will arrive within no time</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
