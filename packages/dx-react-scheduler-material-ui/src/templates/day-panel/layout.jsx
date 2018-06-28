import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';

export const Layout = ({
  dayScale,
  tableComponent: Table,
  cellComponent: Cell,
  rowComponent: Row,
  ...restProps
}) => (
  <Table {...restProps}>
    <Row>
      {dayScale.map(day => (
        <Cell
          key={day}
          date={moment(day).toDate()}
        />
      ))}
    </Row>
  </Table>
);

Layout.propTypes = {
  dayScale: PropTypes.array,
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
