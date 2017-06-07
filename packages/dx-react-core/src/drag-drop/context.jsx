import React from 'react';
import PropTypes from 'prop-types';

import { EventEmitter } from '@devexpress/dx-core';

class DragDropContextCore {
  constructor() {
    this.payload = null;
    this.dragEmitter = new EventEmitter();
  }
  start(payload, clientOffset) {
    this.payload = payload;
    this.dragEmitter.emit({ payload: this.payload, clientOffset });
  }
  update(clientOffset) {
    this.dragEmitter.emit({ payload: this.payload, clientOffset });
  }
  end(clientOffset) {
    this.dragEmitter.emit({ payload: this.payload, clientOffset, end: true });
    this.payload = null;
  }
}

export class DragDropContext extends React.Component {
  constructor(props) {
    super(props);

    this.dragDropContext = new DragDropContextCore();

    this.dragDropContext.dragEmitter.subscribe(({ payload, clientOffset, end }) => {
      this.props.onChange({
        payload: end ? null : payload,
        clientOffset: end ? null : clientOffset,
      });
    });
  }
  getChildContext() {
    return {
      dragDropContext: this.dragDropContext,
    };
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children;
  }
  render() {
    return this.props.children;
  }
}

DragDropContext.childContextTypes = {
  dragDropContext: PropTypes.shape().isRequired,
};

DragDropContext.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func,
};

DragDropContext.defaultProps = {
  onChange: () => {},
};
