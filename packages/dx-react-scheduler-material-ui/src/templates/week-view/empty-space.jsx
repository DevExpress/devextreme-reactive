import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { getBorder } from '../utils';

const styles = theme => ({
  emptySpace: {
    borderBottom: getBorder(theme),
    boxSizing: 'border-box',
    height: '100%',
    width: '100%',
  },
});

export const EmptySpaceBase = ({
  classes,
  className,
  ...restProps
}) => <div {...restProps} className={classNames(classes.emptySpace, className)} />;

EmptySpaceBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

EmptySpaceBase.defaultProps = {
  className: undefined,
};

export const EmptySpace = withStyles(styles, { name: 'EmptySpace' })(EmptySpaceBase);
