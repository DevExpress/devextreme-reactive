import * as React from 'react';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'clsx';
import {
  VERTICAL_GROUP_ORIENTATION, getVerticalRowFromGroups, getGroupsLastRow,
} from '@devexpress/dx-scheduler-core';
import { BASIC_CELL_HEIGHT } from '../constants';

const styles = {
  layout: {
    width: 'auto',
    '&:only-child': {
      width: '100%',
    },
  },
};

const VerticalLayoutBase = ({
  rowComponent: Row,
  cellComponent: Cell,
  groups,
  rowSpan,
  viewType,
  classes,
  className,
  cellTextTopOffset,
  ...restProps
}) => {
  const timeTableCellHeight = BASIC_CELL_HEIGHT[viewType];

  return (
    <Table className={classNames(classes.layout, className)} {...restProps}>
      <TableBody>
        {getGroupsLastRow(groups).map((_, groupIndex) => (
          <Row key={groupIndex.toString()}>
            {getVerticalRowFromGroups(groups, groupIndex, rowSpan, timeTableCellHeight).map(({
              group: cellGroup,
              rowSpan: cellRowSpan,
              height, key,
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
    </Table>
  );
};

VerticalLayoutBase.propTypes = {
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  groups: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  rowSpan: PropTypes.number.isRequired,
  viewType: PropTypes.string.isRequired,
  cellTextTopOffset: PropTypes.number,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

VerticalLayoutBase.defaultProps = {
  cellTextTopOffset: undefined,
  className: undefined,
};

export const VerticalLayout = withStyles(styles, { name: 'VerticalLayout' })(VerticalLayoutBase);
