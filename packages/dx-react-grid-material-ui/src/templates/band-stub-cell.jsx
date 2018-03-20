import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { TableCell } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import { getBorderColor } from './utils';

const styles = theme => ({
  cell: {
    padding: 0,
    borderLeft: getBorderColor(theme),
  },
});

const BandStubCellBase = ({
  style, classes, className, tableRow, tableColumn, ...restProps
}) => (
  <TableCell
    style={style}
    className={classNames(classes.cell, className)}
    {...restProps}
  />
);

BandStubCellBase.propTypes = {
  style: PropTypes.object,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

BandStubCellBase.defaultProps = {
  style: null,
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};

export const BandStubCell = withStyles(styles, { name: 'BandStubCellBase' })(BandStubCellBase);
