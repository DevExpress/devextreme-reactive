import * as React from 'react';
import * as PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import classNames from 'clsx';

const styles = {
  content: {
    width: '100%',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  alignCenter: {
    justifyContent: 'center',
  },
  alignRight: {
    justifyContent: 'flex-end',
  },
};

const ContentBase = ({
  column, align, children, classes, className, ...restProps
}) => (
  <div
    className={classNames({
      [classes.content]: true,
      [classes.alignCenter]: align === 'center',
      [classes.alignRight]: align === 'right',
    }, className)}
    {...restProps}
  >
    {children}
  </div>
);

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

export const Content = withStyles(styles, { name: 'Content' })(ContentBase);
