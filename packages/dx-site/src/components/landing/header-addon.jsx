import * as React from 'react';
import PropTypes from 'prop-types';

import styles from './header-addon.module.scss';

const HeaderAddon = ({
  main, additional, imageLink, isIndexPage,
}) => (
  <div className={styles.cropper}>
    <div className="container">
      <div className={`row ${styles.container} ${imageLink !== undefined ? styles.withImage : ''}`}>
        <div className={`col-md-6 col-sm-7 ${isIndexPage ? styles.indexBlock : styles.block}`}>
          <h1 className={styles.main}>
            {main}
          </h1>
          <h3 className={styles.additional}>
            {additional}
          </h3>
        </div>
        {imageLink ? (
          <div className={`col-md-6 col-sm-5 ${styles.block} d-none d-sm-block`}>
            <img
              alt="Product Overview"
              src={imageLink}
              className={styles.overviewImage}
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
  isIndexPage: PropTypes.bool,
};

HeaderAddon.defaultProps = {
  imageLink: undefined,
  isIndexPage: false,
};

export default HeaderAddon;
