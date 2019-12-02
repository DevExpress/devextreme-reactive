import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { getBrightBorder } from '../utils';

const styles = theme => ({
  table: {
    tableLayout: 'fixed',
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
  return (
    <>
      {groups.map((group) => {
        const colSpan = width / group.length;
        return (
          <Row {...restProps}>
            {group.map((groupingItem) => {
              return (
                <Cell
                  groupingItem={groupingItem}
                  colSpan={colSpan}
                />
              );
            })}
          </Row>
        );
      })}
    </>
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
