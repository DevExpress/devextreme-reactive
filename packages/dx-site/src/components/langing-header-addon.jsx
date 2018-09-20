import * as React from 'react';
import * as PropTypes from 'prop-types';

import styles from './landing-header-addon.module.scss';

const LandingHeaderAddon = ({ main, additional, imageLink }) => (
  <div className="container">
    <div className="row">
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
);

LandingHeaderAddon.propTypes = {
  main: PropTypes.node.isRequired,
  additional: PropTypes.node.isRequired,
  imageLink: PropTypes.string,
};

LandingHeaderAddon.defaultProps = {
  imageLink: undefined,
};

export default LandingHeaderAddon;
