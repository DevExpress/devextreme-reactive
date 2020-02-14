import * as React from 'react';
import styles from './title.module.scss';

export default ({ text, iconComponent: Icon }) => (
  <div className="row mx-0">
    <div className="col-md-12">
      <Icon className={styles.icon} />
      <h1 className={styles.title}>
        {text}
      </h1>
    </div>
  </div>
);
