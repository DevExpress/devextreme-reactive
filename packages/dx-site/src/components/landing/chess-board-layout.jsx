import * as React from 'react';
import * as PropTypes from 'prop-types';

import styles from './chess-board-layout.module.scss';

const ChessBoardLayout = ({
  items,
  title,
}) => (
  <div className={styles.layout}>
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
  </div>
);

ChessBoardLayout.propTypes = {
  firstChild: PropTypes.node.isRequired,
  secondChild: PropTypes.node.isRequired,
  title: PropTypes.string,
};

ChessBoardLayout.defaultProps = {
  title: undefined,
};

export default ChessBoardLayout;
