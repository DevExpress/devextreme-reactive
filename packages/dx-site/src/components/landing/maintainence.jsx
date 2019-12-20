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
            The product is developed on a full-time basis by a dedicated team.
            {' '}
            All the issues you face will be consistently addressed once they appear.
            {' '}
            Check our support flow on GitHub.
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Maintainance;
