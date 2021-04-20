import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCellMUI from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { getBorder } from './utils';

const styles = theme => ({
  cell: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    '&:first-child': {
      paddingLeft: theme.spacing(3),
    },
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '&:focus-visible': {
      border: '1px solid blue',
      outline: "none",
    }
  },
  footer: {
    borderBottom: getBorder(theme),
  },
  cellRightAlign: {
    textAlign: 'right',
  },
  cellCenterAlign: {
    textAlign: 'center',
  },
  cellNoWrap: {
    whiteSpace: 'nowrap',
  },
});

class TableCellBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  componentDidMount() {
    const { setRefKeyboardNavigation, tableRow, tableColumn } = this.props;
    setRefKeyboardNavigation && setRefKeyboardNavigation(this.ref, tableRow.key, tableColumn.key);
  }

  render() {
    const { column, value, children, classes,
      tableRow, tableColumn, row,
      className, setRefKeyboardNavigation,
      ...restProps } = this.props;
    return (
      <TableCellMUI
          className={classNames({
            [classes.cell]: true,
            [classes.cellRightAlign]: tableColumn && tableColumn.align === 'right',
            [classes.cellCenterAlign]: tableColumn && tableColumn.align === 'center',
            [classes.cellNoWrap]: !(tableColumn && tableColumn.wordWrapEnabled),
          }, className)}
          classes={{ footer: classes.footer }}
          ref={this.ref}
          {...restProps}
        >
          {children || value}
      </TableCellMUI>
    )
  }
}

TableCellBase.propTypes = {
  value: PropTypes.any,
  column: PropTypes.object,
  row: PropTypes.any,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  className: PropTypes.string,
  setRefKeyboardNavigation: PropTypes.func,
};

TableCellBase.defaultProps = {
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined,
};

export const TableCell = withStyles(styles, { name: 'TableCell' })(TableCellBase);
