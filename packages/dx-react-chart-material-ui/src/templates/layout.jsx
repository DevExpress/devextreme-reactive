import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {
  Sizer,
} from '@devexpress/dx-react-core';

const styles = (theme) => {
  const { fontFamily, fontSize, fontWeightLight } = theme.typography;
  return ({
    root: {
      fontFamily,
      fontSize,
      fontWeight: fontWeightLight,
      display: 'flex',
      flexDirection: 'column',
      // height: '100%',
      // width: '100%',
      padding: '10px',
    },
  });
};

export class RootBase extends React.PureComponent {
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.width !== nextProps.width) {
  //     this.props.cw(nextProps.width);
  //     // this.props.ch(nextProps.height);
  //   }
  // }
  render() {
    const {
      width, height, children, style, classes, className, cw, ch, ...restProps
    } = this.props;

    return (
      <div
        className={classNames(classes.root, className)}
        style={{
          // width: `${width}px`,
          height: `${height}px`,
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
  // width: PropTypes.number.isRequired,
  // height: PropTypes.number.isRequired,
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
