import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';

export const Layout = ({
  dayUnits,
  tableComponent: Table,
  cellComponent: Cell,
  rowComponent: Row,
  ...restProps
}) => (
  <Table {...restProps}>
    <Row>
      {dayUnits.map((day) => {
        const currentDate = moment(day);
        return (<Cell key={day}>{currentDate.format('ddd')} {currentDate.format('D')}</Cell>);
      })}
    </Row>
  </Table>
);

Layout.propTypes = {
  dayUnits: PropTypes.array,
  tableComponent: PropTypes.func,
  cellComponent: PropTypes.func,
  rowComponent: PropTypes.func,
};
Layout.defaultProps = {
  dayUnits: [],
  tableComponent: () => null,
  cellComponent: () => null,
  rowComponent: () => null,
};
