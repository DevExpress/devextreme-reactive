import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  cell: {
    cursor: 'pointer',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
});

const CellBase = ({
  contentComponent: Content,
  iconComponent: Icon,
  style, colSpan, row,
  column, expanded,
  onToggle,
  classes, children,
  className, tableRow,
  tableColumn, ...restProps
}) => {
  const handleClick = () => onToggle();

  return (
    <TableCell
      colSpan={colSpan}
      style={style}
      className={classNames(classes.cell, className)}
      onClick={handleClick}
      {...restProps}
    >
      <Icon
        expanded={expanded}
      />
      <Content
        column={column}
        row={row}
      >
        {children}
      </Content>
    </TableCell>
  );
};

CellBase.propTypes = {
  contentComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  iconComponent: PropTypes.func.isRequired,
  style: PropTypes.object,
  colSpan: PropTypes.number,
  row: PropTypes.any,
  column: PropTypes.object,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

CellBase.defaultProps = {
  style: null,
  colSpan: 1,
  row: {},
  column: {},
  expanded: false,
  onToggle: () => {},
  children: undefined,
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};

export const Cell = withStyles(styles, { name: 'TableGroupCell' })(CellBase);
