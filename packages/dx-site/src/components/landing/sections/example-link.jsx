import * as React from 'react';
import GatsbyLink from 'gatsby-link';

import styles from './example-link.module.scss';

export default ({ title, path }) => (
  <div className={styles.link}>
    <GatsbyLink to={path}>{title}</GatsbyLink>
  </div>
);
