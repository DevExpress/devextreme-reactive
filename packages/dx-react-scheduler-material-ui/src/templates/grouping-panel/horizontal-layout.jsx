import * as React from 'react';
import * as PropTypes from 'prop-types';

export const HorizontalLayout = ({
  rowComponent: Row,
  cellComponent: Cell,
  groups,
  width,
  ...restProps
}) => (
  <>
    {groups.map((group) => {
      const colSpan = width / group.length;
      return (
        <Row
          key={groups[0][0].text.concat('row')}
          {...restProps}
        >
          {group.map(groupingItem => (
            <Cell
              groupingItem={groupingItem}
              colSpan={colSpan}
              key={groupingItem.text}
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
