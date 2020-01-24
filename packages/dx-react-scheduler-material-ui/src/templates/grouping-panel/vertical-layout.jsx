import * as React from 'react';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'clsx';
import { VERTICAL_GROUP_ORIENTATION } from '@devexpress/dx-scheduler-core';

const useStyles = makeStyles(({ spacing }) => ({
  layout: {
    tableLayout: 'fixed',
    borderCollapse: 'separate',
    width: ({ width }) => `${spacing(width / 8)}px`,
  },
}));

export const VerticalLayout = ({
  rowComponent: Row,
  cellComponent: Cell,
  groups,
  rowSpan,
  timeTableCellHeight,
  width,
  className,
  ...restProps
}) => {
  const classes = useStyles({ width });
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
                height: (rowSpan * groupSpan) / groups[groups.length - 1].length,
                hasBrightBorder: true,
              });
            }
          }
          return (
            <Row>
              {cells.map(({
                group: cellGroup,
                rowSpan: cellRowSpan,
                height, hasBrightBorder,
              }) => {
                return (
                  <Cell
                    group={cellGroup}
                    rowSpan={cellRowSpan}
                    height={height}
                    left={0}
                    hasBrightBorder={hasBrightBorder}
                    colSpan={1}
                    timeTableCellHeight={timeTableCellHeight}
                    groupOrientation={VERTICAL_GROUP_ORIENTATION}
                  />
                );
              })}
            </Row>
          )
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
  timeTableCellHeight: PropTypes.number,
  width: PropTypes.number.isRequired,
  className: PropTypes.string,
};

VerticalLayout.defaultProps = {
  timeTableCellHeight: 48,
  className: undefined,
};
