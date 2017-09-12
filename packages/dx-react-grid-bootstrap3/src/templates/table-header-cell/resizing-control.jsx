import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from '@devexpress/dx-react-core';

const ResizingControlLine = ({ resizing, style }) => {
  const resizingControlLineBody = resizing && (
    <div
      className="bg-primary"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
      }}
    />
  );

  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: '#ddd',
        height: '50%',
        width: '1px',
        top: '25%',
        ...style,
      }}
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
      const { changeDraftColumnWidth } = this.props;
      changeDraftColumnWidth({ shift: x - this.resizeStartingX });
    };
    this.onResizeEnd = ({ x }) => {
      const { changeColumnWidth } = this.props;
      changeColumnWidth({ shift: x - this.resizeStartingX });
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
          style={{
            position: 'absolute',
            userSelect: 'none',
            MozUserSelect: 'none',
            WebkitUserSelect: 'none',
            top: 0,
            right: '-8px',
            width: '16px',
            height: '100%',
            cursor: 'col-resize',
            zIndex: 100,
          }}
        >
          <ResizingControlLine resizing={resizing} style={{ left: '5px' }} />
          <ResizingControlLine resizing={resizing} style={{ left: '7px' }} />
        </div>
      </Draggable>
    );
  }
}

ResizingControl.propTypes = {
  changeColumnWidth: PropTypes.func.isRequired,
  changeDraftColumnWidth: PropTypes.func.isRequired,
};
