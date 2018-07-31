import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Draggable } from '../draggable';

export class DragSource extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { children } = this.props;
    return nextProps.children !== children;
  }

  render() {
    const { dragDropProvider } = this.context;
    const {
      onStart, onUpdate, onEnd, payload, children,
    } = this.props;
    return (
      <Draggable
        onStart={({ x, y }) => {
          dragDropProvider.start(payload, { x, y });
          onStart({ clientOffset: { x, y } });
        }}
        onUpdate={({ x, y }) => {
          dragDropProvider.update({ x, y });
          onUpdate({ clientOffset: { x, y } });
        }}
        onEnd={({ x, y }) => {
          dragDropProvider.end({ x, y });
          onEnd({ clientOffset: { x, y } });
        }}
      >
        {children}
      </Draggable>
    );
  }
}

DragSource.contextTypes = {
  dragDropProvider: PropTypes.object.isRequired,
};

DragSource.propTypes = {
  children: PropTypes.node.isRequired,
  payload: PropTypes.any.isRequired,
  onStart: PropTypes.func,
  onUpdate: PropTypes.func,
  onEnd: PropTypes.func,
};

DragSource.defaultProps = {
  onStart: () => {},
  onUpdate: () => {},
  onEnd: () => {},
};
