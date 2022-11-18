import * as React from 'react';
import PropTypes from 'prop-types';

import styles from './product-block.module.scss';

const Title = ({ text }) => text.split('\n').map(chunk => <span key={Math.random().toString()}>{chunk}</span>);

const ProductLink = ({
  type, icon: Icon, title, links, condensed,
}) => (
  <div className={`col-lg-${condensed ? 3 : 4} col-md-4  ${styles.productBlock}`}>
    <div className={`d-flex flex-row flex-md-column align-content-end ${styles.container} ${styles[type]}`}>
      <div className={`${styles.titleWrapper} align-self-center`}>
        <div className="d-flex flex-row justify-content-md-center align-items-end">
          <Icon className={styles.icon} />
          <div className={styles.title}>
            <Title text={title} />
          </div>
        </div>
      </div>
      <div className={`${styles.divider}`} />
      <div className={styles.links}>
        {links}
      </div>
    </div>
  </div>
);

ProductLink.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  links: PropTypes.node.isRequired,
  condensed: PropTypes.bool,
};

ProductLink.defaultProps = {
  condensed: false,
};

export default ProductLink;
