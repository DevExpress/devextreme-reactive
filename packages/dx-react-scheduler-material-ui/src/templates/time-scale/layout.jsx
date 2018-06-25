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
      const hour = time[0][0];
      const minute = time[0][1];
      return (
        <Row key={time[0]}>
          <Cell>
            {i % 2
              ? null
              : moment().hour(hour).minute(minute).format('h:mm A')
            }
          </Cell>
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
