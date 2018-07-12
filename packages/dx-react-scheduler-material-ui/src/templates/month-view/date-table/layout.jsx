import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Layout = ({
  monthCells,
  tableComponent: Table,
  cellComponent: Cell,
  rowComponent: Row,
  ...restProps
}) => {
  return (
    <Table {...restProps}>
      {monthCells.map(row => (
        <Row key={`date_navigator_row_${row[0].value.toString()}`}>
          {row.map(date => <Cell key={date.value} date={date} />)}
        </Row>
      ))}
    </Table>
  );
}

Layout.propTypes = {
  monthCells: PropTypes.array.isRequired,
  tableComponent: PropTypes.func,
  cellComponent: PropTypes.func,
  rowComponent: PropTypes.func,
};
Layout.defaultProps = {
  tableComponent: () => null,
  cellComponent: () => null,
  rowComponent: () => null,
};
