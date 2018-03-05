import React from 'react';
import Link from 'gatsby-link';

const Footer = () => (
  <footer className="footer">
    <div className="footer__div--container">
      <div className="footer__div--col">
        <h1 className="footer__h1--name">Paul Serraino.</h1>
        <h2 className="footer__h2--job-title">Full Stack Developer</h2>
      <span className="footer__span--legal">© 2018, All rights reserved.</span>
      </div>
      <div className="footer__div--col">
        <ul className="footer__ul">
          <li><a target="_blank" href="https://github.com/paulserraino">Github</a></li>
          <li><a target="_blank" href="https://www.youtube.com/channel/UC4jjKLXy4Z2nh5W3MUFkD4Q">Youtube</a></li>
          <li><a target="_blank" href="https://www.linkedin.com/in/paul-serraino-07067b94">LinkedIn</a></li>
          <li><a target="_blank" href="http://overfitt.io">{`overfitt.io`}</a></li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
