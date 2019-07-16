import * as React from 'react';
import * as PropTypes from 'prop-types';

import styles from './layout-row-content.module.scss';

const LayoutRowContent = ({
  items,
  title,
}) => (
  <div className="container">
    {title && (
      <div className="row">
        <div className="col-12">
          <h4 className={styles.title}>{title}</h4>
        </div>
      </div>
    )}
    <div className="row">
      {items}
    </div>
  </div>
);

LayoutRowContent.propTypes = {
  firstChild: PropTypes.node,
  secondChild: PropTypes.node,
  title: PropTypes.string,
};

LayoutRowContent.defaultProps = {
  firstChild: null,
  secondChild: null,
  title: undefined,
};

export default LayoutRowContent;
