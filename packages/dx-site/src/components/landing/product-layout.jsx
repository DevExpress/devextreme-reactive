import * as React from 'react';
import * as PropTypes from 'prop-types';

import styles from './product-layout.module.scss';

const ProductLayout = ({ position, children }) => (
  <React.Fragment>
    {position === 'footer' ? (
      <div className={styles.footerTop} />
    ) : null}
    <div className={styles.container}>
      <div className="container">
        <div className={`row ${position === 'footer' ? 'justify-content-center' : ''}`}>
          {children}
        </div>
      </div>
    </div>
    {position === 'footer' ? (
      <div className={styles.footerBottom} />
    ) : null}
  </React.Fragment>
);

ProductLayout.propTypes = {
  position: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ProductLayout;
