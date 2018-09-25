import * as React from 'react';

import styles from './maintainence.module.scss';
import maintainenceLink from './images/maintainence.png';

const Maintainance = () => (
  <div className={`container ${styles.container}`}>
    <div className="row align-items-center">
      <div className="col-md-3 d-flex flex-row justify-content-center">
        <img
          alt="Maintainence & Customer Support"
          src={maintainenceLink}
        />
      </div>
      <div className="col-md-9">
        <div className={styles.title}>
          Maintainence & Customer Support
        </div>
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
);

export default Maintainance;
