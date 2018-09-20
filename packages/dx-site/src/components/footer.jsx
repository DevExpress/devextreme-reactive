import * as React from 'react';

import styles from './footer.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <div className="container">
      <div className="row">
        <div className={`col-md-4 ${styles.links}`}>
          <a href="https://community.devexpress.com/tags/DevExtreme+Reactive/default.aspx">Blog</a>
          <a href="https://github.com/DevExpress/devextreme-reactive">GitHub</a>
          <a href="https://js.devexpress.com/Buy/">Buy</a>
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
          <a href="https://js.devexpress.com/Privacy/">Your Privacy - Legal Statements</a>
          <br />
          <a href="https://js.devexpress.com/Licensing/">Licensing</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
