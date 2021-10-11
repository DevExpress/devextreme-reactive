import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import withStyles from '@mui/styles/withStyles';
import { LAYOUT_MEDIA_QUERY } from '../constants';

const styles = {
  root: {
    height: '100%',
    margin: '0 auto',
    overflowY: 'auto',
  },
  container: {
    display: 'flex',
    [`${LAYOUT_MEDIA_QUERY}`]: {
      flexDirection: 'column',
    },
  },
  stickyContainer: {
    display: 'flex',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
};

const LayoutBase = ({
  basicLayoutComponent: BasicLayout,
  commandLayoutComponent: CommandLayout,
  recurrenceLayoutComponent: RecurrenceLayout,
  isRecurrence,
  children,
  classes,
  className,
  ...restProps
}) => (
  <div
    className={classNames(classes.root, className)}
    {...restProps}
  >
    <div className={classes.stickyContainer}>
      <CommandLayout />
    </div>
    <div className={classes.container}>
      <BasicLayout />
      <RecurrenceLayout />
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
  isRecurrence: PropTypes.bool,
};

LayoutBase.defaultProps = {
  className: undefined,
  isRecurrence: false,
  children: null,
};

export const Layout = withStyles(styles)(LayoutBase, { name: 'Layout' });
