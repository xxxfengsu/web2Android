import React from 'react';
import './ConactUs.less';

export default function ConactUs() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <img src="/logoWithTitle.png" alt="logo" className="footer-logo" />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.
          </p>
        </div>
        <div className="footer-columns">
          <div className="footer-col">
            <h4>Customer</h4>
            <ul>
              <li>About us</li>
              <li>Shop</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Information</h4>
            <ul>
              <li>Contact</li>
              <li>FAQ</li>
              <li>Service</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact Info</h4>
            <ul>
              <li>2118 Thornridge Cir. Syracuse,<br/>Connecticut 35624.</li>
              <li>
                <span className="footer-icon">📞</span>
                123-456-789
              </li>
              <li>
                <span className="footer-icon">✉️</span>
                Divano@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <hr />
        <div className="footer-copyright">
          @ 2023 DIVANO. All Rights Reserved Eleyas Hasan
        </div>
      </div>
    </footer>
  );
}