import * as React from 'react';
import PropTypes from 'prop-types';
import LayoutRowContent from './layout-row-content';

import styles from './layout-row.module.scss';

const LayoutRow = props => (
  <div className={styles.layoutRow}>
    <LayoutRowContent {...props} />
  </div>
);

LayoutRow.propTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string,
};

LayoutRow.defaultProps = {
  title: undefined,
};

export default LayoutRow;
