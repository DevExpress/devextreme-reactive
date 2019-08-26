import * as React from 'react';
import * as PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { TITLE_LABEL, ORDINARY_LABEL } from '@devexpress/dx-scheduler-core';

const styles = theme => ({
  label: {
    fontSize: theme.typography.fontSize + 2,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  titleLabel: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.fontSize + 5,
  },
});

const LabelBase = React.memo(({
  classes,
  text,
  className,
  id,
  ...restProps
}) => (
  <Typography
    className={classNames({
      [classes.label]: true,
      [classes.titleLabel]: id === TITLE_LABEL,
    }, className)}
    {...restProps}
  >
    {text}
  </Typography>
));

LabelBase.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
};

LabelBase.defaultProps = {
  text: undefined,
  className: undefined,
  id: ORDINARY_LABEL,
};

export const Label = withStyles(styles)(LabelBase, { name: 'Label' });
