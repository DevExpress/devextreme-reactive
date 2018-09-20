import * as React from 'react';

import styles from './footer.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <div className="container">
      <div className="row">
        <div className={`col-md-4 ${styles.links}`}>
          <a
            href="https://community.devexpress.com/tags/DevExtreme+Reactive/default.aspx"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blog
          </a>
          <a
            href="https://github.com/DevExpress/devextreme-reactive"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://js.devexpress.com/Buy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy
          </a>
        </div>
        <div className={`col-md-8 ${styles.copyright}`}>
          Copyright © 2011-
          {new Date().getFullYear()}
          {' '}
          Developer Express Inc.
          <br />
          All trademarks or registered trademarks are property of their respective owners.
          <br />
          <br />
          <a
            href="https://js.devexpress.com/Privacy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Your Privacy - Legal Statements
          </a>
          <br />
          <a
            href="https://js.devexpress.com/Licensing/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Licensing
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
