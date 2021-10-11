import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import withStyles from '@mui/styles/withStyles';

const styles = theme => ({
  groupInfo: {
    color: theme.typography.caption.color,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize,
  },
});

const GroupPanelEmptyMessageBase = ({
  getMessage,
  classes,
  className,
  forwardedRef,
  ...restProps
}) => (
  <div
    ref={forwardedRef}
    className={classNames(classes.groupInfo, className)}
    {...restProps}
  >
    {getMessage('groupByColumn')}
  </div>
);

GroupPanelEmptyMessageBase.propTypes = {
  getMessage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

GroupPanelEmptyMessageBase.defaultProps = {
  className: undefined,
  forwardedRef: undefined,
};

export const GroupPanelEmptyMessage = withStyles(styles, { name: 'GroupPanelEmptyMessage' })(GroupPanelEmptyMessageBase);
