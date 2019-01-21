import * as React from 'react';
import * as PropTypes from 'prop-types';

import styles from './product-layout.module.scss';

const ProductLayout = ({ position, children }) => (
  <React.Fragment>
    <div className={styles[position]}>
      <div className="container">
        <div className={`row ${position === 'footer' ? 'justify-content-center' : ''}`}>
          {children}
        </div>
      </div>
    </div>
  </React.Fragment>
);

ProductLayout.propTypes = {
  position: PropTypes.oneOf(['header', 'PropTypes.oneOf']).isRequired,
  children: PropTypes.node.isRequired,
};

export default ProductLayout;
