import * as React from 'react';
import * as PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import classNames from 'clsx';

const styles = {
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};

const TitelBase = ({
  children, classes, className, ...restProps
}) => (
  <span
    className={classNames(classes.title, className)}
    {...restProps}
  >
    {children}
  </span>
);

TitelBase.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

TitelBase.defaultProps = {
  className: null,
  children: undefined,
};

export const Title = withStyles(styles, { name: 'Title' })(TitelBase);
