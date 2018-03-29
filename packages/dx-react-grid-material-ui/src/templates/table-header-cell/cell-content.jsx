import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

const styles = {
  cellContent: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flexDirection: 'inherit',
  },
};

const CellContentBase = ({
  children, classes, className, showGroupingControls, ...restProps
}) => (
  <div
    className={classNames(classes.cellContent, className)}
    {...restProps}
  >
    {children}
  </div>
);

export const CellContent = withStyles(styles, { name: 'CellContent' })(CellContentBase);

CellContentBase.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  showGroupingControls: PropTypes.bool,
};

CellContentBase.defaultProps = {
  className: null,
  showGroupingControls: false,
};
