import * as React from 'react';
import styles from './title.module.scss';

export default ({ text }) => (
  <div className="row">
    <div className="col-md-12">
      <div className={styles.title}>
        {text}
      </div>
    </div>
  </div>
);
