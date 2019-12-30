import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getCellKey } from '@devexpress/dx-scheduler-core';

const getRow = (width, groupRow, cellStyle, groups, rowIndex) => {
  let row = [];
  const standardWidth = width / groups[groups.length - 1].length;
  const colSpan = groups[groups.length - 1].length / groupRow.length;
  for (let i = 0; i < standardWidth; i += 1) {
    row = [...row, ...groupRow.reduce((acc, group, index) => {
      return [
        ...acc,
        {
          group,
          colSpan,
          key: getCellKey(groups, index, rowIndex),
          left: cellStyle.left,
        },
      ];
    }, [])];
  }
  return row;
};

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
      console.log('hiiiiiiiiiiiiiiiii')
      return (
        <Row
          key={groups[rowIndex][0].text}
          {...restProps}
        >
          {!showHeaderForEveryDate && groupRow.map((group, index) => (
            <Cell
              group={group}
              colSpan={cellColSpan}
              // key={getCellKey(groups, index, rowIndex)}
              left={cellStyle.left}
            />
          ))}
          {showHeaderForEveryDate && (
            getRow(colSpan, groupRow, cellStyle, groups, rowIndex).map(({
              group, colSpan: columnSpan, key,
            }) => {
              return (
                <Cell
                  group={group}
                  colSpan={columnSpan}
                  // key={key}
                  left={cellStyle.left}
                />
              )
            })
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
