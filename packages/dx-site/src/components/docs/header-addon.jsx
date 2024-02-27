/* globals document */
import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './header-addon.module.scss';

const COOKIE_ID = 'dx-cookie-header-addon';

const HeaderAddon = React.memo(({ spanText, link, linkText }) => {
  const [shown, setShown] = React.useState(typeof document !== 'undefined' && document.cookie.indexOf(COOKIE_ID) === -1);

  const onClick = React.useCallback(() => {
    setShown(false);
    document.cookie = `${COOKIE_ID}=${escape(new Date())};expires=${new Date(2100, 0, 1).toGMTString()};path=/`;
  }, []);

  if (shown) {
    return (
      <div
        className={styles.main}
      >
        <div className="container">
          <div
            className={`row ${styles.row}`}
          >
            <div className="col-auto">
              <span>
                {spanText}
              </span>
              <span className={`col-auto ${styles.underline}`}>
                <a target="_blank" rel="noopener noreferrer" href={link} className={styles.link}>
                  {linkText}
                </a>
              </span>
            </div>
            {/* eslint-disable-next-line */}
            <span onClick={onClick} className={`col-auto align-self-end ${styles.underline}`}>
            Dismiss
            </span>
          </div>
        </div>
      </div>
    );
  } return null;
});

HeaderAddon.propTypes = {
  spanText: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default HeaderAddon;
