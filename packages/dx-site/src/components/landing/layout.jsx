import * as React from 'react';
import * as PropTypes from 'prop-types';

import styles from './layout.module.scss';

const Layout = ({ children }) => (
  <div className={styles.container}>
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
