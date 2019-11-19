import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withStyles } from '@material-ui/core/styles';

const styles = {
};

const LayoutBase = ({
  rowComponent: Row,
  cellComponent: Cell,
  groups,
  classes,
  className,
  ...restProps
}) => (
  <div
    className={classNames(classes.root, className)}
    {...restProps}
  >
    {groups.map((group) => {
      return (
        <Row>
          {group.map((groupingItem) => {
            return (
              <Cell
                groupingItem={groupingItem}
              />
            );
          })}
        </Row>
      );
    })}
  </div>
);

LayoutBase.propTypes = {
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  isRecurrence: PropTypes.bool,
  groups: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
};

LayoutBase.defaultProps = {
  className: undefined,
  isRecurrence: false,
  children: null,
};

export const Layout = withStyles(styles)(LayoutBase, { name: 'Layout' });
