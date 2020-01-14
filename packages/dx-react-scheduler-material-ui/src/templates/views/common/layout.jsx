import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Table } from './table';
import { cellsMeta } from '../../utils';

export class Layout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.table = React.createRef();
  }

  componentDidMount() {
    this.setCells();
  }

  componentDidUpdate() {
    this.setCells();
  }

  setCells() {
    const { setCellElementsMeta } = this.props;

    const tableElement = this.table.current;
    setCellElementsMeta(cellsMeta(tableElement));
  }

  render() {
    const {
      setCellElementsMeta,
      cellsNumber,
      children,
      ...restProps
    } = this.props;

    return (
      <Table
        ref={this.table}
        cellsNumber={cellsNumber}
        {...restProps}
      >
        {children}
      </Table>
    );
  }
}

Layout.propTypes = {
  setCellElementsMeta: PropTypes.func.isRequired,
  cellsNumber: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};
