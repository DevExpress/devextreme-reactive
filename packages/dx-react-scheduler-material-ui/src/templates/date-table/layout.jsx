import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Layout = ({
  timeUnits,
  dayUnits,
  tableComponent: Table,
  cellComponent: Cell,
  rowComponent: Row,
  ...restProps
}) => (
  <Table {...restProps}>
    {timeUnits.map(time => (
      <Row key={time}>
        {dayUnits.map(day => <Cell key={day} day={day} time={time} />)}
      </Row>
    ))}
  </Table>
);

Layout.propTypes = {
  timeUnits: PropTypes.array,
  dayUnits: PropTypes.array,
  tableComponent: PropTypes.func,
  cellComponent: PropTypes.func,
  rowComponent: PropTypes.func,
};
Layout.defaultProps = {
  timeUnits: [],
  dayUnits: [],
  tableComponent: () => null,
  cellComponent: () => null,
  rowComponent: () => null,
};
