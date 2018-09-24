import * as React from 'react';
import * as PropTypes from 'prop-types';

import styles from './header-addon.module.scss';

const HeaderAddon = ({ main, additional, imageLink }) => (
  <div className={styles.cropper}>
    <div className="container">
      <div className={`row ${styles.container}`}>
        <div className={`col-md-8 ${styles.block}`}>
          <div className={styles.main}>
            {main}
          </div>
          <div className={styles.additional}>
            {additional}
          </div>
        </div>
        {imageLink ? (
          <div className={`col-md-4 ${styles.block}`}>
            <img
              alt="Product Overview"
              src={imageLink}
            />
          </div>
        ) : null}
      </div>
    </div>
  </div>
);

HeaderAddon.propTypes = {
  main: PropTypes.node.isRequired,
  additional: PropTypes.node.isRequired,
  imageLink: PropTypes.string,
};

HeaderAddon.defaultProps = {
  imageLink: undefined,
};

export default HeaderAddon;
