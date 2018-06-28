import * as React from 'react';
import * as PropTypes from 'prop-types';
import TableMUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import RootRef from '@material-ui/core/RootRef';

export class Table extends React.PureComponent {
  constructor(props) {
    super(props);
    this.findCells = this.findCells.bind(this);
  }
  findCells(tableElement) {
    this.props.dateTableCellRefs(tableElement.querySelectorAll('td'));
  }
  render() {
    const { children, dateTableCellRefs, ...restProps } = this.props;
    return (
      <RootRef rootRef={this.findCells}>
        <TableMUI
          {...restProps}
          style={{ tableLayout: 'fixed' }}
        >
          <TableBody>
            {children}
          </TableBody>
        </TableMUI>
      </RootRef>
    );
  }
}

Table.propTypes = {
  children: PropTypes.node.isRequired,
  dateTableCellRefs: PropTypes.func.isRequired,
};
