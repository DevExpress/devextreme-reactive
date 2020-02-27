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
    {cellsData.map((days, index) => (
      <Row key={index.toString()}>
        {days.map(({
          startDate, endDate, groupingInfo, endOfGroup, groupOrientation,
        }) => (
          <Cell
            key={getViewCellKey(startDate, groupingInfo)}
            startDate={startDate}
            endDate={endDate}
            endOfGroup={endOfGroup}
            hasRightBorder={endOfGroup}
            groupingInfo={groupingInfo}
            groupOrientation={groupOrientation}
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
