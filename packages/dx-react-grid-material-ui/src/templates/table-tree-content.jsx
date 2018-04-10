import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
  content: {
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

const TableTreeContentBase = ({
  children, classes, className, ...restProps
}) => (
  <div
    className={classNames({
      [classes.content]: true,
    }, className)}
    {...restProps}
  >
    {children}
  </div>
);

TableTreeContentBase.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

TableTreeContentBase.defaultProps = {
  children: undefined,
  className: undefined,
};

export const TableTreeContent = withStyles(styles)(TableTreeContentBase);
