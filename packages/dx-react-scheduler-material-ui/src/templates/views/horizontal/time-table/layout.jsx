
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Layout as LayoutBase } from '../../common/layout';
import { getViewCellKey } from '../../../utils';

export const Layout = React.memo(({
  setCellElementsMeta,
  cellComponent: Cell,
  rowComponent: Row,
  cellsData,
  formatDate,
  ...restProps
}) => (
  <LayoutBase
    setCellElementsMeta={setCellElementsMeta}
    cellsNumber={cellsData[0].length}
    {...restProps}
  >
    {cellsData.map(row => (
      <Row key={row[0].startDate.toString()}>
        {row.map(({
          startDate, endDate, today,
          otherMonth, hasRightBorder, groupingInfo,
        }) => (
          <Cell
            key={getViewCellKey(startDate, groupingInfo)}
            startDate={startDate}
            endDate={endDate}
            today={today}
            otherMonth={otherMonth}
            formatDate={formatDate}
            hasRightBorder={hasRightBorder}
            groupingInfo={groupingInfo}
          />
        ))}
      </Row>
    ))}
  </LayoutBase>
));

Layout.propTypes = {
  cellsData: PropTypes.arrayOf(Array).isRequired,
  cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  formatDate: PropTypes.func.isRequired,
  setCellElementsMeta: PropTypes.func.isRequired,
};
