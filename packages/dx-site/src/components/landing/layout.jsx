import * as React from 'react';
import PropTypes from 'prop-types';

import styles from './layout.module.scss';

const Layout = ({ children, ...restProps }) => (
  <div {...restProps} className={styles.container}>
    <div className="container">
      <div className="row">
        {children}
      </div>
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
