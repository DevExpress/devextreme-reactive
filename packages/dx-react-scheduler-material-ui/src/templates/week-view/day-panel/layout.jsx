import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Layout = ({
  dayScale,
  tableComponent: Table,
  cellComponent: Cell,
  rowComponent: Row,
  ...restProps
}) => (
  <Table {...restProps}>
    <Row>
      {dayScale.map(date => (
        <Cell
          key={date}
          date={date}
        />
      ))}
    </Row>
  </Table>
);

Layout.propTypes = {
  dayScale: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  tableComponent: PropTypes.func,
  cellComponent: PropTypes.func,
  rowComponent: PropTypes.func,
};
Layout.defaultProps = {
  dayScale: [],
  tableComponent: () => null,
  cellComponent: () => null,
  rowComponent: () => null,
};
