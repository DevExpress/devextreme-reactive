import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from '../draggable';

export class DragSource extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children;
  }
  render() {
    const { dragDropContext } = this.context;
    return (
      <Draggable
        onStart={({ x, y }) => dragDropContext.start(this.props.getData(), { x, y })}
        onUpdate={({ x, y }) => dragDropContext.update({ x, y })}
        onEnd={() => dragDropContext.end()}
      >
        {this.props.children}
      </Draggable>
    );
  }
}

DragSource.contextTypes = {
  dragDropContext: PropTypes.shape().isRequired,
};

DragSource.propTypes = {
  children: PropTypes.node.isRequired,
  getData: PropTypes.func.isRequired,
};

DragSource.defaultProps = {};
