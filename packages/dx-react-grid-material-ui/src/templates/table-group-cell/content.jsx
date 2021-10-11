import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import withStyles from '@mui/styles/withStyles';

const styles = () => ({
  columnTitle: {
    verticalAlign: 'middle',
  },
});

const ContentBase = ({
  column, row, classes, className, children, ...restProps
}) => (
  <span
    className={classNames(classes.columnTitle, className)}
    {...restProps}
  >
    <strong>
      {column.title || column.name}
      :
      {' '}
    </strong>
    {children || String(row.value)}
  </span>
);

ContentBase.propTypes = {
  row: PropTypes.any,
  column: PropTypes.object,
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

ContentBase.defaultProps = {
  row: {},
  column: {},
  children: undefined,
  className: undefined,
};

export const Content = withStyles(styles)(ContentBase);
