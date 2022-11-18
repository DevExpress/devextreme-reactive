import * as React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import classNames from 'clsx';
import {
  VERTICAL_GROUP_ORIENTATION, getVerticalRowFromGroups, getGroupsLastRow, VIEW_TYPES,
} from '@devexpress/dx-scheduler-core';
import { BASIC_CELL_HEIGHT } from '../constants';

const PREFIX = 'VerticalLayout';

export const classes = {
  layout: `${PREFIX}-layout`,
};

const StyledTable = styled(Table)({
  [`&.${classes.layout}`]: {
    width: 'auto',
    '&:only-child': {
      width: '100%',
    },
  },
});

const allDayCellHeight = BASIC_CELL_HEIGHT[VIEW_TYPES.ALL_DAY_PANEL];

export const VerticalLayout = ({
  rowComponent: Row,
  cellComponent: Cell,
  groups,
  rowSpan,
  viewType,
  className,
  cellTextTopOffset,
  alignWithAllDayRow,
  ...restProps
}) => {
  const timeTableCellHeight = BASIC_CELL_HEIGHT[viewType];

  return (
    <StyledTable className={classNames(classes.layout, className)} {...restProps}>
      <TableBody>
        {getGroupsLastRow(groups).map((_, groupIndex) => (
          <Row key={groupIndex.toString()}>
            {getVerticalRowFromGroups(
              groups, groupIndex, rowSpan, timeTableCellHeight,
              alignWithAllDayRow, allDayCellHeight,
            ).map(({
              group: cellGroup,
              rowSpan: cellRowSpan,
              key, height,
            }) => (
              <Cell
                group={cellGroup}
                rowSpan={cellRowSpan}
                height={height}
                left={0}
                colSpan={1}
                groupOrientation={VERTICAL_GROUP_ORIENTATION}
                topOffset={cellTextTopOffset}
                key={key}
              />
            ))}
          </Row>
        ))}
      </TableBody>
    </StyledTable>
  );
};

VerticalLayout.propTypes = {
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  alignWithAllDayRow: PropTypes.bool,
  groups: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  rowSpan: PropTypes.number.isRequired,
  viewType: PropTypes.string.isRequired,
  cellTextTopOffset: PropTypes.number,
  className: PropTypes.string,
};

VerticalLayout.defaultProps = {
  cellTextTopOffset: undefined,
  className: undefined,
  alignWithAllDayRow: false,
};
