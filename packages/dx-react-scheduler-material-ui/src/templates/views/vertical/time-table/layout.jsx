import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Layout as LayoutBase } from '../../common/layout';
import { getViewCellKey } from '../../../utils';

const prepareCellsData = (cellsData, allDayCellsData) => {
  const groupCount = allDayCellsData ? allDayCellsData.length : 1;
  const validCellsData = [];
  const groupHeight = cellsData.length / groupCount;
  for (let i = 0; i < groupCount; i += 1) {
    validCellsData.push(cellsData.slice(i * groupHeight, (i + 1) * groupHeight));
  }
  return validCellsData;
};

const renderCell = (
  Cell, startDate, endDate, endOfGroup, groupingInfo, groupOrientation,
) => (
  <Cell
    key={getViewCellKey(startDate, groupingInfo)}
    startDate={startDate}
    endDate={endDate}
    endOfGroup={endOfGroup}
    hasRightBorder={endOfGroup}
    groupingInfo={groupingInfo}
    groupOrientation={groupOrientation}
  />
);

export const Layout = React.memo(({
  setCellElementsMeta,
  cellComponent,
  allDayCellComponent,
  rowComponent: Row,
  allDayRowComponent: AllDayRow,
  cellsData,
  allDayCellsData,
  formatDate,
  ...restProps
}) => (
  <LayoutBase
    setCellElementsMeta={setCellElementsMeta}
    cellsNumber={cellsData[0].length}
    {...restProps}
  >
    {prepareCellsData(cellsData, allDayCellsData).map((group, groupIndex) => (
      <React.Fragment key={groupIndex.toString()}>
        {allDayCellsData && (
          <AllDayRow>
            {allDayCellsData[groupIndex].map(({
              startDate, endDate, endOfGroup, groupingInfo, groupOrientation,
            }) => renderCell(
              allDayCellComponent, startDate, endDate,
              endOfGroup, groupingInfo, groupOrientation,
            ))}
          </AllDayRow>
        )}
        {group.map((days, index) => (
          <Row key={index.toString()}>
            {days.map(({
              startDate, endDate, groupingInfo, endOfGroup, groupOrientation,
            }) => renderCell(
              cellComponent, startDate, endDate,
              endOfGroup, groupingInfo, groupOrientation,
            ))}
          </Row>
        ))}
      </React.Fragment>
    ))}
  </LayoutBase>
));

Layout.propTypes = {
  cellsData: PropTypes.arrayOf(Array).isRequired,
  allDayCellsData: PropTypes.arrayOf(Array),
  cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  allDayCellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  allDayRowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  formatDate: PropTypes.func.isRequired,
  setCellElementsMeta: PropTypes.func.isRequired,
};

Layout.defaultProps = {
  allDayCellComponent: () => null,
  allDayRowComponent: () => null,
  allDayCellsData: undefined,
};
