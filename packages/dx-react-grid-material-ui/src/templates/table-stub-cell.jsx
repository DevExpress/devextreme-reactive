import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { getBorder } from './utils';

const styles = theme => ({
  cell: {
    padding: 0,
  },
  footer: {
    borderBottom: getBorder(theme),
  },
});

class TableStubCellBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  componentDidMount() {
    const { setRefKeyboardNavigation, tableRow, tableColumn } = this.props;
    setRefKeyboardNavigation && setRefKeyboardNavigation(this.ref, tableRow.key, tableColumn.key);
  }

  render() {
    const { classes,
      className,
      tableRow,
      tableColumn, setRefKeyboardNavigation,
      ...restProps } = this.props;
    return (
      <TableCell
        className={classNames(classes.cell, className)}
        classes={{ footer: classes.footer }}
        ref={this.ref}
        {...restProps}
      />
    )
  }
}

TableStubCellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  tableRow: PropTypes.object,
  tableColumn: PropTypes.object,
};

TableStubCellBase.defaultProps = {
  className: undefined,
  tableRow: undefined,
  tableColumn: undefined,
};

export const TableStubCell = withStyles(styles, { name: 'TableStubCell' })(TableStubCellBase);
