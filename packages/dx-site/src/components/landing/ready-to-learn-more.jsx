import * as React from 'react';
import * as PropTypes from 'prop-types';

import styles from './ready-to-learn-more.module.scss';

const ReadyToLearnMore = ({ links }) => (
  <div className={styles.container}>
    <div className="container">
      Ready to learn more?
      {' '}
      <span className={styles.links}>
        {links}
      </span>
    </div>
  </div>
);

ReadyToLearnMore.propTypes = {
  links: PropTypes.node.isRequired,
};

export default ReadyToLearnMore;
