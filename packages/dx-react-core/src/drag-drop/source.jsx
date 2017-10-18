import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from '../draggable';

export class DragSource extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children;
  }
  render() {
    const { dragDropContext } = this.context;
    const { onStart, onUpdate, onEnd } = this.props;
    return (
      <Draggable
        onStart={({ x, y }) => {
          dragDropContext.start(this.props.getPayload(), { x, y });
          onStart({ clientOffset: { x, y } });
        }}
        onUpdate={({ x, y }) => {
          dragDropContext.update({ x, y });
          onUpdate({ clientOffset: { x, y } });
        }}
        onEnd={({ x, y }) => {
          dragDropContext.end({ x, y });
          onEnd({ clientOffset: { x, y } });
        }}
      >
        {this.props.children}
      </Draggable>
    );
  }
}

DragSource.contextTypes = {
  dragDropContext: PropTypes.object.isRequired,
};

DragSource.propTypes = {
  children: PropTypes.node.isRequired,
  getPayload: PropTypes.func.isRequired,
  onStart: PropTypes.func,
  onUpdate: PropTypes.func,
  onEnd: PropTypes.func,
};

DragSource.defaultProps = {
  onStart: () => {},
  onUpdate: () => {},
  onEnd: () => {},
};
