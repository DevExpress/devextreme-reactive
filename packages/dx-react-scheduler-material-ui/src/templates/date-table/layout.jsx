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
        {dayScale.map(date => <Cell key={date} date={date} time={time} />)}
      </Row>
    ))}
  </Table>
);

Layout.propTypes = {
  timeScale: PropTypes.array,
  dayScale: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
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
