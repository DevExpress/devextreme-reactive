import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => {
  const { fontFamily, fontSize, fontWeightLight } = theme.typography;
  return ({
    root: {
      fontFamily,
      fontSize,
      fontWeight: fontWeightLight,
      display: 'flex',
      flexDirection: 'column',
      padding: '10px',
    },
  });
};

export class RootBase extends React.PureComponent {
  render() {
    const {
      children, width, height, style, classes, className, ...restProps
    } = this.props;

    return (
      <div
        className={classNames(classes.root, className)}
        style={{
          height: `${height}px`,
          ...width ? { width: `${width}px` } : null,
          ...style,
        }}
        {...restProps}
      >
        {children}
      </div>
    );
  }
}

RootBase.propTypes = {
  children: PropTypes.node,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
};

RootBase.defaultProps = {
  className: undefined,
  children: undefined,
  style: null,
};

export const Root = withStyles(styles)(RootBase);
