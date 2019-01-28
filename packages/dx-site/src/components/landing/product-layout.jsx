import * as React from 'react';
import * as PropTypes from 'prop-types';

import styles from './product-layout.module.scss';

const ProductLayout = ({ position, children }) => (
  <React.Fragment>
    <div className={`${styles[position]} ${position === 'footer' ? 'd-none d-sm-block' : ''}`}>
      <div className="container">
        <div className="row">
          {children}
        </div>
      </div>
    </div>
  </React.Fragment>
);

ProductLayout.propTypes = {
  position: PropTypes.oneOf(['header', 'footer']).isRequired,
  children: PropTypes.node.isRequired,
};

export default ProductLayout;
