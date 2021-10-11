import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { Draggable } from '@devexpress/dx-react-core';
import withStyles from '@mui/styles/withStyles';

const styles = theme => ({
  resizeHandle: {
    position: 'absolute',
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    width: theme.spacing(2),
    top: 0,
    right: -theme.spacing(1),
    height: '100%',
    cursor: 'col-resize',
    zIndex: 100,
  },
  resizeHandleLine: {
    position: 'absolute',
    backgroundColor: theme.palette.primary.light,
    height: '50%',
    width: '1px',
    top: '25%',
    transition: 'all linear 100ms',
  },
  resizeHandleFirstLine: {
    left: `calc(${theme.spacing(1)} - 1px)`,
  },
  resizeHandleSecondLine: {
    left: `calc(${theme.spacing(1)} + 1px)`,
  },
  resizeHandleLineActive: {
    left: theme.spacing(1),
  },
  resizeHandleActive: {
    '& $resizeHandleLine': {
      opacity: '1',
      backgroundColor: theme.palette.primary.light,
      height: 'calc(100% - 4px)',
      top: '2px',
    },
  },
});

export class ResizingControlBase extends React.PureComponent {
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
      onWidthDraft({ shift: x - this.resizeStartingX });
    };
    this.onResizeEnd = ({ x }) => {
      const { onWidthChange, onWidthDraftCancel } = this.props;
      onWidthDraftCancel();
      onWidthChange({ shift: x - this.resizeStartingX });
      this.setState({ resizing: false });
    };
  }

  render() {
    const { classes, resizeHandleOpacityClass, resizeLastHandleClass } = this.props;
    const { resizing } = this.state;

    return (
      <Draggable
        onStart={this.onResizeStart}
        onUpdate={this.onResizeUpdate}
        onEnd={this.onResizeEnd}
      >
        <div
          className={classNames({
            [classes.resizeHandle]: true,
            [resizeLastHandleClass]: true,
            [classes.resizeHandleActive]: resizing,
          })}
        >
          <div
            className={classNames({
              [resizeHandleOpacityClass]: true,
              [classes.resizeHandleLine]: true,
              [classes.resizeHandleFirstLine]: true,
              [classes.resizeHandleLineActive]: resizing,
            })}
          />
          <div
            className={classNames({
              [resizeHandleOpacityClass]: true,
              [classes.resizeHandleLine]: true,
              [classes.resizeHandleSecondLine]: true,
              [classes.resizeHandleLineActive]: resizing,
            })}
          />
        </div>
      </Draggable>
    );
  }
}

ResizingControlBase.propTypes = {
  onWidthChange: PropTypes.func.isRequired,
  onWidthDraft: PropTypes.func.isRequired,
  onWidthDraftCancel: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  resizeLastHandleClass: PropTypes.string.isRequired,
  resizeHandleOpacityClass: PropTypes.string.isRequired,
};

export const ResizingControl = withStyles(styles, { name: 'ResizingControl' })(ResizingControlBase);
