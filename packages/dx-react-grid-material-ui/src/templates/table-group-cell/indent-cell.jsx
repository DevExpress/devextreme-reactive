import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { getStickyCellStyle } from '../utils';

const styles = theme => ({
  indentCell: getStickyCellStyle(theme),
});

const IndentCellBase = ({
  left,
  tableRow,
  tableColumn,
  row, column,
  style, className, classes,
  ...restProps
}) => (
  <td
    className={classNames(classes.indentCell, className)}
    style={{ ...style, left }}
    {...restProps}
  />
);

IndentCellBase.propTypes = {
  left: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  row: PropTypes.any,
  column: PropTypes.object,
  style: PropTypes.object,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

IndentCellBase.defaultProps = {
  left: '',
  tableRow: undefined,
  tableColumn: undefined,
  row: {},
  column: {},
  style: null,
  className: undefined,
};

export const IndentCell = withStyles(styles)(IndentCellBase);
