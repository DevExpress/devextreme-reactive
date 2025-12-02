import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './notification-box.module.scss';

const NotificationBox = ({ style }) => (
  <div className="notification-box-container container" style={style}>
    <div className="row">
      <div className="col-12">
        <div className={styles.notificationBox}>
          <p className={styles.notificationBoxTitle}>
            DevExtreme Reactive Components - End-of-Life
          </p>
          <p className={styles.notificationBoxText}>
            DevExtreme Reactive component libraries have reached&nbsp;
            <a
              href="https://github.com/DevExpress/devextreme-reactive/blob/master/README.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              end-of-life (EOL)
            </a>
            . We will no longer provide updates, bug fixes, or technical support
            for these libraries.
          </p>
          <p className={`m-0 ${styles.notificationBoxText}`}>
            <b>Developing a React App? Check out our updated React UI Suite instead.</b>
            <br />
            If you are considering React for an upcoming software project or
            have used DevExtreme Reactive components in the past, please visit&nbsp;
            <a
              href="https://js.devexpress.com/react/"
              target="_blank"
              rel="noopener noreferrer"
            >
              js.devexpress.com/react
            </a>
            &nbsp;and download a free trial version of DevExtreme React UI - over 80+ components
            designed to help you build your best, without limits or compromise.
          </p>
        </div>
      </div>
    </div>
  </div>
);

NotificationBox.propTypes = {
  style: PropTypes.object,
};

NotificationBox.defaultProps = {
  style: null,
};

export default NotificationBox;
