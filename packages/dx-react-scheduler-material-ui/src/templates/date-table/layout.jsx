import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Layout = ({
  timeScale,
  dayScale,
  tableComponent: Table,
  cellComponent: Cell,
  rowComponent: Row,
  ...restProps
}) => (
  <Table {...restProps}>
    {timeScale.map((time, index) => (
      <Row key={index.toString()}>
        {dayScale.map(day => <Cell key={day} day={day} time={time} />)}
      </Row>
    ))}
  </Table>
);

Layout.propTypes = {
  timeScale: PropTypes.array,
  dayScale: PropTypes.array,
  tableComponent: PropTypes.func,
  cellComponent: PropTypes.func,
  rowComponent: PropTypes.func,
};
Layout.defaultProps = {
  timeScale: [],
  dayScale: [],
  tableComponent: () => null,
  cellComponent: () => null,
  rowComponent: () => null,
};
