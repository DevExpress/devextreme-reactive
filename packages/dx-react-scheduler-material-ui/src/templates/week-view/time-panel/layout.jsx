import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';

export const Layout = ({
  timeScale,
  tableComponent: Table,
  cellComponent: Cell,
  rowComponent: Row,
  ...restProps
}) => (
  <Table {...restProps}>
    {timeScale.map((time, index) => {
      const hour = moment(time.end).hour();
      const minute = moment(time.end).minute();
      return (
        <Row key={time.start}>
          {index % 2
          ? null
          : (
            <Cell
              rowSpan="2"
              time={moment().hour(hour).minute(minute).toDate()}
            />
          )}
        </Row>
      );
    })}
  </Table>
);

Layout.propTypes = {
  timeScale: PropTypes.array,
  tableComponent: PropTypes.func,
  cellComponent: PropTypes.func,
  rowComponent: PropTypes.func,
};
Layout.defaultProps = {
  timeScale: [],
  tableComponent: () => null,
  cellComponent: () => null,
  rowComponent: () => null,
};
