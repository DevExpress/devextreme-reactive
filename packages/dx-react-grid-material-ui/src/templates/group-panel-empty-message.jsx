import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withStyles } from '@material-ui/core/styles';

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
  ...restProps
}) => (
  <div
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
};

GroupPanelEmptyMessageBase.defaultProps = {
  className: undefined,
};

export const GroupPanelEmptyMessage = withStyles(styles, { name: 'GroupPanelEmptyMessage' })(GroupPanelEmptyMessageBase);
