import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';

const styles = {
  table: {
    tableLayout: 'fixed',
  },
};

const HorizontalLayoutBase = ({
  rowComponent: Row,
  cellComponent: Cell,
  groups,
  classes,
  className,
  width,
  ...restProps
}) => {
  return (
    <Table
      className={classNames(classes.table, className)}
      {...restProps}
    >
      {groups.map((group) => {
        const cellWidth = `${100 / group.length}%`;
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
          </Row>
        );
      })}
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
