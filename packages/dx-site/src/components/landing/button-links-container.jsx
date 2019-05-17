import * as React from 'react';
import styles from './button-links-container.module.scss';

export default ({ children }) => (
  <span className={styles.links}>
    {children}
  </span>
)
