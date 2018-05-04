import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

const styles = (theme) => {
  const { fontFamily, fontSize, fontWeightLight } = theme.typography;
  return ({
    root: {
      fontFamily,
      fontSize,
      fontWeight: fontWeightLight,
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
          width: `${width}px`,
          height: `${height}px`,
          display: 'flex',
          flexDirection: 'column',
          padding: '10px',
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
  style: undefined,
};

export const Root = withStyles(styles)(RootBase);
