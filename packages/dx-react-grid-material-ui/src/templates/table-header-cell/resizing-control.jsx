import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { Draggable } from '@devexpress/dx-react-core';
import { styled } from '@mui/material';

const PREFIX = 'ResizingControl';
export const classes = {
  resizeHandle: `${PREFIX}-resizeHandle`,
  resizeHandleLine: `${PREFIX}-resizeHandleLine`,
  resizeHandleFirstLine: `${PREFIX}-resizeHandleFirstLine`,
  resizeHandleSecondLine: `${PREFIX}-resizeHandleSecondLine`,
  resizeHandleLineActive: `${PREFIX}-resizeHandleLineActive`,
};
const StyledDiv = styled('div')(({ theme }) => ({
  [`&.${classes.resizeHandle}`]: {
    position: 'absolute',
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    width: theme.spacing(2),
    top: 0,
    right: theme.spacing(-1),
    height: '100%',
    cursor: 'col-resize',
    zIndex: 100,
  },
  [`&.${classes.resizeHandleLine}`]: {
    position: 'absolute',
    backgroundColor: theme.palette.primary.light,
    height: '50%',
    width: '1px',
    top: '25%',
    transition: 'all linear 100ms',
  },
  [`&.${classes.resizeHandleFirstLine}`]: {
    left: `calc(${theme.spacing(1)} - 1px)`,
  },
  [`&.${classes.resizeHandleSecondLine}`]: {
    left: `calc(${theme.spacing(1)} + 1px)`,
  },
  [`&.${classes.resizeHandleLineActive}`]: {
    left: theme.spacing(1),
    opacity: 1,
    backgroundColor: theme.palette.primary.light,
    height: 'calc(100% - 4px)',
    top: '2px',
  },
}));

const ResizeHandle = ({ children, forwardedRef, ...restProps }) => (
  <StyledDiv
    ref={forwardedRef}
    {...restProps}
  >
    {children}
  </StyledDiv>
);

ResizeHandle.propTypes = {
  children: PropTypes.node,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

ResizeHandle.defaultProps = {
  children: undefined,
  forwardedRef: undefined,
};

export class ResizingControl extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      resizing: false,
    };

    this.onResizeStart = ({ x }) => {
      this.resizeStartingX = x;
      this.setState({ resizing: true });
    };
    this.onResizeUpdate = ({ x }) => {
      const { onWidthDraft } = this.props;
      if (x >= 0) {
        onWidthDraft({ shift: x - this.resizeStartingX });
      }
    };
    this.onResizeEnd = ({ x }) => {
      const { onWidthChange, onWidthDraftCancel } = this.props;
      onWidthDraftCancel();
      onWidthChange({ shift: x - this.resizeStartingX });
      this.setState({ resizing: false });
    };
  }

  render() {
    const { resizeHandleOpacityClass, resizeLastHandleClass } = this.props;
    const { resizing } = this.state;

    return (
      <Draggable
        onStart={this.onResizeStart}
        onUpdate={this.onResizeUpdate}
        onEnd={this.onResizeEnd}
      >
        <ResizeHandle
          className={classNames({
            [classes.resizeHandle]: true,
            [resizeLastHandleClass]: true,
          })}
        >
          <StyledDiv
            className={classNames({
              [resizeHandleOpacityClass]: true,
              [classes.resizeHandleLine]: true,
              [classes.resizeHandleFirstLine]: true,
              [classes.resizeHandleLineActive]: resizing,
            })}
          />
          <StyledDiv
            className={classNames({
              [resizeHandleOpacityClass]: true,
              [classes.resizeHandleLine]: true,
              [classes.resizeHandleSecondLine]: true,
              [classes.resizeHandleLineActive]: resizing,
            })}
          />
        </ResizeHandle>
      </Draggable>
    );
  }
}

ResizingControl.propTypes = {
  onWidthChange: PropTypes.func.isRequired,
  onWidthDraft: PropTypes.func.isRequired,
  onWidthDraftCancel: PropTypes.func.isRequired,
  resizeLastHandleClass: PropTypes.string.isRequired,
  resizeHandleOpacityClass: PropTypes.string.isRequired,
};
