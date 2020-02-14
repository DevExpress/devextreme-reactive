import * as React from 'react';

import styles from './maintainence.module.scss';

const Maintainance = () => (
  <div className={`container ${styles.container}`}>
    <div className="row">
      <div className="col-12">
        <div className={styles.content}>
          <h2 className={styles.title}>
            Maintenance & Customer Support
          </h2>
          <div className={styles.description}>
            We are here to help and to do everything possible to earn your trust. To learn more about our commitment to total customer satisfaction, please check out our support flow on GitHub.
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Maintainance;
