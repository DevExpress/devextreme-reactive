/* globals document */
import * as React from 'react';
import styles from './survey-header-addon.module.scss';

const COOKIE_ID = 'dx-cookie-survey';

const SurveyHeaderAddon = () => {
  const [shown, setShown] = React.useState(true);

  React.useEffect(() => {
    if (document.cookie.indexOf(COOKIE_ID) !== -1) {
      setShown(false);
    }
  }, []);

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
                Help us make our software better.
              </span>
              <span className={`col-auto ${styles.underline}`}>
                <a target="_blank" rel="noopener noreferrer" href="https://www.devexpress.com/web/devextreme-survey.xml">
                  Take our 5 minute survey.
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
};

export default SurveyHeaderAddon;
