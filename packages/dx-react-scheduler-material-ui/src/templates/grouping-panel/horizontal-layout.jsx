import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { getBrightBorder } from '../utils';
import { TableHead } from '@material-ui/core';

const styles = theme => ({
  table: {
    // tableLayout: 'fixed',
  },
  cell: {
    borderLeft: getBrightBorder(theme),
    '&:first-child': {
      borderLeft: 'none',
    },
  }
});

const HorizontalLayoutBase = ({
  rowComponent: Row,
  cellComponent: Cell,
  groups,
  classes,
  className,
  width,
  ...restProps
}) => {
  const a = [];
  for (let i = 0; i < width; i += 1) {
    a.push(i);
  }
  return (
    <Table
      className={classNames(classes.table, className)}
      {...restProps}
    >
      <TableHead>
        {groups.map((group) => {
          const cellWidth = `${100 / group.length}%`;
          const divWidth = `${100 / width}%`;
          const colSpan = width / group.length;
          return (
            <Row>
              {group.map((groupingItem) => {
                return (
                  <Cell
                    groupingItem={groupingItem}
                    width={cellWidth}
                    colspan={colSpan}
                  />
                );
              })}
              {/* {a.map((num) => {
              return (
                <div className={classes.cell} style={{ display: 'table-cell' }}>
                  {num}
                </div>
              );
            })} */}
            </Row>
          );
        })}
      </TableHead>
    </Table>
  );
};

HorizontalLayoutBase.propTypes = {
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  groups: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  width: PropTypes.number.isRequired,
};

HorizontalLayoutBase.defaultProps = {
  className: undefined,
  children: null,
};

export const HorizontalLayout = withStyles(styles)(HorizontalLayoutBase, { name: 'HorizontalLayout' });
