import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { Draggable } from '@devexpress/dx-react-core';

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
    const { resizing } = this.state;

    return (
      <Draggable
        onStart={this.onResizeStart}
        onUpdate={this.onResizeUpdate}
        onEnd={this.onResizeEnd}
      >
        <div
          className={classNames({
            'dx-g-bs4-resizing-control-wrapper': true,
            'dx-g-bs4-resizing-control-wrapper-active': resizing,
          })}
        >
          <div
            className={classNames({
              'dx-g-bs4-resize-control-line dx-g-bs4-resize-control-line-first bg-primary': true,
              'dx-g-bs4-resize-control-line-active': resizing,
            })}
          />
          <div
            className={classNames({
              'dx-g-bs4-resize-control-line dx-g-bs4-resize-control-line-second bg-primary': true,
              'dx-g-bs4-resize-control-line-active': resizing,
            })}
          />
        </div>
      </Draggable>
    );
  }
}

ResizingControl.propTypes = {
  onWidthChange: PropTypes.func.isRequired,
  onWidthDraft: PropTypes.func.isRequired,
  onWidthDraftCancel: PropTypes.func.isRequired,
};
