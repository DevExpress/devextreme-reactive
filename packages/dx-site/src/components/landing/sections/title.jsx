import * as React from 'react';
import styles from './title.module.scss';

export default ({ text }) => (
  <div className="row">
    <div className="col-md-12">
      <h1 className={styles.title}>
        {text}
      </h1>
    </div>
  </div>
);
