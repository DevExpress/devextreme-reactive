import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import { getBorderColor } from './utils';

const styles = theme => ({
  cell: {
    '&:first-child': {
      borderLeft: 0,
    },
    padding: 0,
    borderBottom: 0,
    borderTop: 0,
    borderRight: 0,
    borderLeft: getBorderColor(theme),
  },
});

const BandEmptyCellBase = ({
  style,
  classes,
  className,
  tableRow,
  tableColumn,
  ...restProps
}) => (
  <TableCell
    style={style}
    className={classNames(classes.cell, className)}
    {...restProps}
  />
);

BandEmptyCellBase.propTypes = {
  style: PropTypes.object,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

BandEmptyCellBase.defaultProps = {
  style: null,
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};

export const BandEmptyCell = withStyles(styles, { name: 'TableStubCell' })(BandEmptyCellBase);
