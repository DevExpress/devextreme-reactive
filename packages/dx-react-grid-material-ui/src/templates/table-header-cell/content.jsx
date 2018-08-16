import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = {
  cellContent: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flexDirection: 'inherit',
  },
};

const ContentBase = ({
  children, classes, className, ...restProps
}) => (
  <div
    className={classNames(classes.cellContent, className)}
    {...restProps}
  >
    {children}
  </div>
);

export const Content = withStyles(styles, { name: 'Content' })(ContentBase);

ContentBase.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

ContentBase.defaultProps = {
  className: null,
  children: undefined,
};
