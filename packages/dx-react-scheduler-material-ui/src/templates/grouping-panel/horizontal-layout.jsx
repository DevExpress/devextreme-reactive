import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getCellKey } from '@devexpress/dx-scheduler-core';

export const HorizontalLayout = ({
  rowComponent: Row,
  cellComponent: Cell,
  groups,
  colSpan,
  cellStyle,
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
          {groupRow.map((group, index) => (
            <Cell
              group={group}
              colSpan={cellColSpan}
              key={getCellKey(groups, index, rowIndex)}
              left={cellStyle.left}
            />
          ))}
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
};
