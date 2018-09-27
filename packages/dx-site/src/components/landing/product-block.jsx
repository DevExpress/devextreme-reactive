import * as React from 'react';
import * as PropTypes from 'prop-types';

import styles from './product-block.module.scss';

const ProductLink = ({
  type, iconLink, title, links,
}) => (
  <div className="col-md-4 col-lg-3">
    <div className={`d-flex flex-column align-items-center justify-content-center ${styles.container} ${styles[type]}`}>
      <div className={`d-flex flex-row justify-content-center align-items-center ${styles.logo}`}>
        <img
          className={styles.icon}
          alt="title"
          src={iconLink}
        />
        <div className={styles.title}>
          {title}
        </div>
      </div>
      {links}
    </div>
  </div>
);

ProductLink.propTypes = {
  type: PropTypes.string.isRequired,
  iconLink: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  links: PropTypes.node.isRequired,
};

export default ProductLink;
