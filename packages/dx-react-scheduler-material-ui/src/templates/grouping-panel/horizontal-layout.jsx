import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getCellKey, getRowFromGroups } from '@devexpress/dx-scheduler-core';

export const HorizontalLayout = ({
  rowComponent: Row,
  cellComponent: Cell,
  groups,
  colSpan,
  cellStyle,
  showHeaderForEveryDate,
  ...restProps
}) => (
  <>
    {groups.map((groupRow, rowIndex) => {
      const cellColSpan = colSpan / groupRow.length;
      return (
        <Row
          key={groups[rowIndex][0].text}
          {...restProps}
        >
          {!showHeaderForEveryDate && groupRow.map((group, index) => (
            <Cell
              group={group}
              colSpan={cellColSpan}
              key={getCellKey(groups, index, rowIndex)}
              left={cellStyle.left}
              brightRightBorder
            />
          ))}
          {showHeaderForEveryDate && (
            getRowFromGroups(colSpan, groupRow, cellStyle, groups, rowIndex).map(({
              group, colSpan: columnSpan, key, brightRightBorder,
            }) => (
              <Cell
                group={group}
                colSpan={columnSpan}
                key={key}
                left={cellStyle.left}
                brightRightBorder={brightRightBorder}
                brightTopBorder={false}
              />
            ))
          )}
        </Row>
      );
    })}
  </>
);

HorizontalLayout.propTypes = {
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  groups: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  colSpan: PropTypes.number.isRequired,
  cellStyle: PropTypes.object.isRequired,
  showHeaderForEveryDate: PropTypes.bool,
};

HorizontalLayout.defaultProps = {
  showHeaderForEveryDate: false,
};
