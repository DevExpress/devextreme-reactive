import * as React from 'react';
import PropTypes from 'prop-types';

import styles from './ready-to-learn-more.module.scss';

const ReadyToLearnMore = ({ links }) => (
  <div className={styles.container}>
    <div className="container">
      <span className={`${styles.title} mx-4`}>
        Ready to learn more?
      </span>

      <span className={`${styles.links} mx-4`}>
        {links}
      </span>
    </div>
  </div>
);

ReadyToLearnMore.propTypes = {
  links: PropTypes.node.isRequired,
};

export default ReadyToLearnMore;
