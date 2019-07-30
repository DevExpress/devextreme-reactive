import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
    margin: '0 auto',
    boxSizing: 'border-box',
  },
  container: {
    display: 'flex',
  },
});

const LayoutBase = ({
  basicLayoutComponent: BasicLayout,
  controlLayoutComponent: ControlLayout,
  recurrenceLayoutComponent: RecurrenceLayout,
  recurrenceEditing,
  children,
  classes,
  className,
  ...restProps
}) => {

  return (
    <div
      className={classNames(classes.root, className)}
      {...restProps}
    >
      <ControlLayout />

      <div className={classes.container}>
        <BasicLayout />

        {
          recurrenceEditing && (
            <RecurrenceLayout />
          )
        }
      </div>
      {children}
    </div>
  );
};

LayoutBase.propTypes = {
  basicLayoutComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  controlLayoutComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  recurrenceLayoutComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

LayoutBase.defaultProps = {
  className: undefined,
};

export const Layout = withStyles(styles)(LayoutBase, { name: 'Layout' });
