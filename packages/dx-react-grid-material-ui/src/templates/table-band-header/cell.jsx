import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { getBorder } from '../utils';

const styles = theme => ({
  cell: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    '&:first-child': {
      paddingLeft: theme.spacing(3),
    },
    '&:last-child': {
      paddingRight: theme.spacing(3),
      borderRight: 0,
    },
    '&:focus-visible': {
      border: '1px solid blue',
      outline: "none",
    },
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    borderBottom: getBorder(theme),
    borderRight: getBorder(theme),
  },
  beforeBorder: {
    borderLeft: getBorder(theme),
  },
});

class CellBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  componentDidMount() {
    const { setRefKeyboardNavigation, tableColumn, tableRow } = this.props;
    setRefKeyboardNavigation && setRefKeyboardNavigation(this.ref, tableRow.key, tableColumn.key);
  }

  render() {
    const { column, value, children, classes, tableRow, tableColumn, row, className, beforeBorder, setRefKeyboardNavigation,
      ...restProps } = this.props;
    return (
      <TableCell
        className={classNames({
          [classes.cell]: true,
          [classes.beforeBorder]: beforeBorder,
        }, className)}
        {...restProps}
        ref={this.ref}
      >
        {children}
      </TableCell>
    )
  }
}

CellBase.propTypes = {
  value: PropTypes.any,
  column: PropTypes.object,
  row: PropTypes.any,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
  className: PropTypes.string,
  beforeBorder: PropTypes.bool,
};

CellBase.defaultProps = {
  value: undefined,
  column: undefined,
  row: undefined,
  children: undefined,
  tableRow: undefined,
  tableColumn: undefined,
  className: undefined,
  beforeBorder: false,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
