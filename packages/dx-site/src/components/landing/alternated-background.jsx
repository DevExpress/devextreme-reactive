import * as React from 'react';
import PropTypes from 'prop-types';

import styles from './alternated-background.module.scss';

const AlternatedBackground = ({
  children, style,
}) => (
  <div className={styles.background} style={style}>
    {children}
  </div>
);

AlternatedBackground.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

AlternatedBackground.defaultProps = {
  style: null,
};

export default AlternatedBackground;
