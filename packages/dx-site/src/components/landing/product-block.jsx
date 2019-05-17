import * as React from 'react';
import * as PropTypes from 'prop-types';

import styles from './product-block.module.scss';

const Title = ({ text }) => text.split('\n').map(chunk => <span key={Math.random().toString()}>{chunk}</span>);

const ProductLink = ({
  type, iconLink, title, links, condensed,
}) => (
  <div className={`col-lg-${condensed ? 3 : 4} col-md-4 col-sm-6 ${styles.productBlock}`}>
    <div className={`d-flex flex-row flex-sm-column align-content-end ${styles.container} ${styles[type]}`}>
      <div className={`${styles.titleWrapper} align-self-center`}>
        <div className="d-flex flex-row justify-content-sm-center align-items-end">
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
      <div className={`${styles.divider} d-sm-none`}/>
      <div className={styles.links}>
        {links}
      </div>
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
