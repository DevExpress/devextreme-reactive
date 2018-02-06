import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { Draggable } from '@devexpress/dx-react-core';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  resizeHandle: {
    position: 'absolute',
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    width: `${theme.spacing.unit * 2}px`,
    top: 0,
    right: `-${theme.spacing.unit}px`,
    height: '100%',
    cursor: 'col-resize',
    zIndex: 100,
  },
  resizeHandleLine: {
    position: 'absolute',
    backgroundColor: theme.palette.grey[300],
    height: '50%',
    width: '1px',
    top: '25%',
    transition: 'all linear 100ms',
  },
  resizeHandleFirstLine: {
    left: `${theme.spacing.unit - 3}px`,
  },
  resizeHandleSecondLine: {
    left: `${theme.spacing.unit - 1}px`,
  },
  resizeHandleActive: {
    '& $resizeHandleLine': {
      backgroundColor: theme.palette.primary[300],
    },
  },
  '@media (pointer: fine)': {
    resizeHandleLine: {
      opacity: 0,
    },
    resizeHandleActive: {
      '& $resizeHandleLine': {
        opacity: 1,
      },
    },
    resizeHandle: {
      '&:hover $resizeHandleLine': {
        opacity: 1,
      },
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
    const { classes } = this.props;
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
            [classes.resizeHandleActive]: resizing,
          })}
        >
          <div
            className={classNames({
              [classes.resizeHandleLine]: true,
              [classes.resizeHandleFirstLine]: true,
            })}
          />
          <div
            className={classNames({
              [classes.resizeHandleLine]: true,
              [classes.resizeHandleSecondLine]: true,
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
};

export const ResizingControl = withStyles(styles, { name: 'ResizingControl' })(ResizingControlBase);
