/* globals document */

import * as React from 'react';

import styles from './cookie.module.scss';

class Cookie extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      shown: typeof document !== 'undefined' && document.cookie.indexOf('dx-cookie-policy') === -1,
    };

    this.close = this.close.bind(this);
  }

  close() {
    this.setState({ shown: false });
    document.cookie = `dx-cookie-policy=${escape(new Date())};expires=${new Date(2100, 0, 1).toGMTString()};path=/`;
  }

  render() {
    const { shown } = this.state;

    return shown ? (
      <footer className={styles.cookie}>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className={styles.title}>
                Why We Use Cookies
              </div>
              This site uses cookies to make your browsing experience more convenient and personal.
              {' '}
              Cookies store useful information on your computer to help
              {' '}
              us improve the efficiency and relevance of our site for you.
              {' '}
              In some cases, they are essential to making the site work properly.
              {' '}
              By accessing this site, you consent to the use of cookies.
              {' '}
              For more information, refer to DevExpress’
              {' '}
              <a
                href="https://www.devexpress.com/AboutUs/privacy-policy.xml"
                target="_blank"
                rel="noopener noreferrer"
              >
                privacy policy
              </a>
              {' '}
              and
              {' '}
              <a
                href="https://www.devexpress.com/AboutUs/cookie-policy.xml"
                target="_blank"
                rel="noopener noreferrer"
              >
                cookie policy
              </a>
              .
            </div>
            <div className="col-md-4 align-self-center d-flex justify-content-center">
              <button
                type="button"
                className={styles.button}
                onClick={this.close}
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      </footer>
    ) : null;
  }
}

export default Cookie;
