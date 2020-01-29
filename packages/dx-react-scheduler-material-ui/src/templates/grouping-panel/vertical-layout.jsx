import * as React from 'react';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'clsx';
import { VERTICAL_GROUP_ORIENTATION } from '@devexpress/dx-scheduler-core';
import { BASIC_CELL_HEIGHT } from '../constants';

const useStyles = makeStyles({
  layout: {
    borderCollapse: 'separate',
    width: 'auto',
    '&:only-child': {
      width: '100%',
    },
  },
});

export const VerticalLayout = ({
  rowComponent: Row,
  cellComponent: Cell,
  groups,
  rowSpan,
  viewType,
  width,
  className,
  topOffset,
  ...restProps
}) => {
  const classes = useStyles({ width });
  const timeTableCellHeight = BASIC_CELL_HEIGHT[viewType];

  return (
    <Table className={classNames(classes.layout, className)} {...restProps}>
      <TableBody>
        {groups[groups.length - 1].map((group, groupIndex) => {
          const cells = [];
          for (let i = 0; i < groups.length; i += 1) {
            const groupSpan = groups[groups.length - 1].length / groups[i].length;
            if (groupIndex % groupSpan === 0) {
              cells.push({
                group: groups[i][groupIndex / groupSpan],
                rowSpan: groupSpan,
                height: (
                  rowSpan * groupSpan * timeTableCellHeight
                ) / groups[groups.length - 1].length,
              });
            }
          }
          return (
            <Row>
              {cells.map(({
                group: cellGroup,
                rowSpan: cellRowSpan,
                height,
              }) => (
                <Cell
                  group={cellGroup}
                  rowSpan={cellRowSpan}
                  height={height}
                  left={0}
                  colSpan={1}
                  groupOrientation={VERTICAL_GROUP_ORIENTATION}
                  topOffset={topOffset}
                />
              ))}
            </Row>
          );
        })}
      </TableBody>
    </Table>
  );
};

VerticalLayout.propTypes = {
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  groups: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  rowSpan: PropTypes.number.isRequired,
  viewType: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  className: PropTypes.string,
};

VerticalLayout.defaultProps = {
  className: undefined,
};
