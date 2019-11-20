import * as React from 'react';
import * as PropTypes from 'prop-types';

import styles from './content-container.module.scss';

export default ({ children }) => (
  <div className={styles.contentContainer}>
    <div className="container">
      {children}
    </div>
  </div>
);
