import * as React from 'react';
import * as PropTypes from 'prop-types';

import styles from './alternated-background.module.scss';

const AlternatedBackground = ({
  children,
}) => (
  <div className={styles.background}>
    {children}
  </div>
);

AlternatedBackground.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AlternatedBackground;
