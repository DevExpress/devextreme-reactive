import * as React from 'react';
import * as PropTypes from 'prop-types';

import styles from './product-block.module.scss';

const Title = ({ text }) => text.split('\n').map(chunk => <span key={Math.random().toString()}>{chunk}</span>);

const ProductLink = ({
  type, iconLink, title, links,
}) => (
  <div className={`col-lg-3 col-md-6 ${styles.productBlock}`}>
    <div className={`d-flex flex-column ${styles.container} ${styles[type]}`}>
      <div className={styles.titleWrapper}>
        <div className="d-flex flex-row justify-content-center align-items-end">
          <img
            className={styles.icon}
            alt="title"
            src={iconLink}
          />
          <div className={styles.title}>
            <Title text={title} />
          </div>
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
