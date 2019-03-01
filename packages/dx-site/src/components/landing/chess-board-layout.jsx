import * as React from 'react';
import * as PropTypes from 'prop-types';

import styles from './chess-board-layout.module.scss';

const ChessBoardLayout = ({
  firstChild, secondChild,
  title, reversed,
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
      <div className={`row ${reversed ? styles.reversed : ''}`}>
        <div className="col-md-6 col-sm-6">
          <div className={styles.child}>
            {firstChild}
          </div>
        </div>
        <div className="col-md-6 col-sm-6">
          <div className={styles.child}>
            {secondChild}
          </div>
        </div>
      </div>
    </div>
  </div>
);

ChessBoardLayout.propTypes = {
  firstChild: PropTypes.node.isRequired,
  secondChild: PropTypes.node.isRequired,
  reversed: PropTypes.bool,
  title: PropTypes.string,
};

ChessBoardLayout.defaultProps = {
  reversed: false,
  title: undefined,
};

export default ChessBoardLayout;
