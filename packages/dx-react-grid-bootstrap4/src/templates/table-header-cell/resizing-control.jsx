import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Draggable } from '@devexpress/dx-react-core';

const ResizingControlLine = ({ resizing, style }) => {
  const resizingControlLineBody = resizing && (
    <div
      className="bg-primary position-absolute w-100 h-100 dx-g-bs4-resizing-control-wrapper"
    />
  );

  return (
    <div
      className="position-absolute h-50 dx-g-bs4-resizing-control-line"
      style={style}
    >
      {resizingControlLineBody}
    </div>
  );
};

ResizingControlLine.propTypes = {
  resizing: PropTypes.bool.isRequired,
  style: PropTypes.object.isRequired,
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
    const { resizing } = this.state;

    return (
      <Draggable
        onStart={this.onResizeStart}
        onUpdate={this.onResizeUpdate}
        onEnd={this.onResizeEnd}
      >
        <div
          className="position-absolute h-100 dx-g-bs4-resizing-control dx-g-bs4-user-select-none"
        >
          <ResizingControlLine resizing={resizing} style={{ left: '5px' }} />
          <ResizingControlLine resizing={resizing} style={{ left: '7px' }} />
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
