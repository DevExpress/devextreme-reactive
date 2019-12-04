import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getCellKey } from '@devexpress/dx-scheduler-core';

export const HorizontalLayout = ({
  rowComponent: Row,
  cellComponent: Cell,
  groups,
  width,
  ...restProps
}) => (
  <>
    {groups.map((groupRow, rowIndex) => {
      const colSpan = width / groupRow.length;
      return (
        <Row
          key={groups[0][0].text.concat('row')}
          {...restProps}
        >
          {groupRow.map((groupingItem, index) => (
            <Cell
              groupingItem={groupingItem}
              colSpan={colSpan}
              key={getCellKey(groups, index, rowIndex)}
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
  width: PropTypes.number.isRequired,
};
