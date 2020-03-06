import * as React from 'react';
import Link from 'gatsby-link';
import styles from './main.module.scss';

const Main = () => (
  <Link to="/" className={styles.main}>
    <span className={styles.title}>
      DevExtreme
    </span>
    {' '}
    <span className={styles.name}>
      Reactive
    </span>
  </Link>
);

export default Main;
