import * as React from 'react';
import PropTypes from 'prop-types';

import styles from './product-layout.module.scss';

const ProductLayout = ({ position, children }) => (
  <>
    <div className={`${styles[position]} ${position === 'footer' ? 'd-none d-sm-block' : ''}`}>
      <div className="container">
        <div className="row">
          {children}
        </div>
      </div>
    </div>
  </>
);

ProductLayout.propTypes = {
  position: PropTypes.oneOf(['header', 'footer']).isRequired,
  children: PropTypes.node.isRequired,
};

export default ProductLayout;
