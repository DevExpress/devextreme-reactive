import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';

export const Layout = ({
  timeUnits,
  tableComponent: Table,
  cellComponent: Cell,
  rowComponent: Row,
  ...restProps
}) => (
  <Table {...restProps}>
    {timeUnits.map((time, i) => {
      const hour = time[1][0];
      const minute = time[1][1];
      return (
        <Row key={time[0]}>
          {i % 2
          ? null
          : (
            <Cell
              rowSpan="2"
              time={moment().hour(hour).minute(minute).format()}
            />
          )}
        </Row>
      );
    })}
  </Table>
);

Layout.propTypes = {
  timeUnits: PropTypes.array,
  tableComponent: PropTypes.func,
  cellComponent: PropTypes.func,
  rowComponent: PropTypes.func,
};
Layout.defaultProps = {
  timeUnits: [],
  tableComponent: () => null,
  cellComponent: () => null,
  rowComponent: () => null,
};
