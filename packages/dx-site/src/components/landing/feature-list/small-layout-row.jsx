import * as React from 'react';
import PropTypes from 'prop-types';
import LayoutRowContent from './layout-row-content';

import styles from './small-layout-row.module.scss';

const SmallLayoutRow = props => (
  <div className={styles.smallLayoutRow}>
    <LayoutRowContent {...props} />
  </div>
);

SmallLayoutRow.propTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string,
};

SmallLayoutRow.defaultProps = {
  title: undefined,
};

export default SmallLayoutRow;
