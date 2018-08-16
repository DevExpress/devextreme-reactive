import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = {
  content: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
  },
  alignCenter: {
    align: 'center',
  },
  alignRight: {
    align: 'right',
  },
};

const ContentBase = ({
  column, align, children, classes, className, ...restProps
}) => (
  <span
    className={classNames({
      [classes.content]: true,
      [classes.alignCenter]: align === 'center',
      [classes.alignRight]: align === 'right',
    }, className)}
    {...restProps}
  >
    {children}
  </span>
);

export const Content = withStyles(styles, { name: 'Content' })(ContentBase);

ContentBase.propTypes = {
  column: PropTypes.object,
  align: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

ContentBase.defaultProps = {
  column: undefined,
  align: 'left',
  className: null,
  children: undefined,
};
