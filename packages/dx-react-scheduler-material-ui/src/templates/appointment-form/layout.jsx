import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    height: '100%',
    padding: theme.spacing(2),
    paddingLeft: 0,
    paddingRight: theme.spacing(3),
    margin: '0 auto',
    overflowY: 'auto',
  },
  container: {
    display: 'flex',
    '@media (max-width: 700px)': {
      flexDirection: 'column',
    },
  },
});

const LayoutBase = ({
  basicLayoutComponent: BasicLayout,
  commandLayoutComponent: CommandLayout,
  recurrenceLayoutComponent: RecurrenceLayout,
  isRecurring,
  children,
  classes,
  className,
  ...restProps
}) => (
  <div
    className={classNames(classes.root, className)}
    {...restProps}
  >
    <CommandLayout />
    <div className={classes.container}>
      <BasicLayout />
      {isRecurring && <RecurrenceLayout />}
    </div>
    {children}
  </div>
);

LayoutBase.propTypes = {
  basicLayoutComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  commandLayoutComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  recurrenceLayoutComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  isRecurring: PropTypes.bool,
};

LayoutBase.defaultProps = {
  className: undefined,
  isRecurring: false,
  children: null,
};

export const Layout = withStyles(styles)(LayoutBase, { name: 'Layout' });
