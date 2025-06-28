import React from 'react';
import './ConactUs.less';

export default function ConactUs() {
  return (
    <footer className="footer">
      <div className="footer-banner-content">
        <h2 className="footer-banner-title">我们负责点燃才华 你们负责照亮时代</h2>
        <div className="footer-banner-subtitle">
          We are responsible for igniting talent; you are responsible for illuminating the times..
        </div>
        <form className="footer-search">
          <input type="text" placeholder="华星璀璨" />
          <button type="submit">搜索</button>
        </form>
      </div>
      <div className="footer-main">
        <div className="footer-brand">
          <img src="/logoWithTitleWhiteTxt.png" alt="logo" className="footer-logo" />
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