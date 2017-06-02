import React from 'react';
import PropTypes from 'prop-types';

import { EventEmitter } from '@devexpress/dx-core';

class DragDropContextCore {
  constructor() {
    this.data = null;
    this.dragEmitter = new EventEmitter();
  }
  start(data, clientOffset) {
    this.data = data;
    this.dragEmitter.emit({ data: this.data, clientOffset });
  }
  update(clientOffset) {
    this.dragEmitter.emit({ data: this.data, clientOffset });
  }
  end() {
    this.data = null;
    this.dragEmitter.emit({ data: this.data, drop: true, clientOffset: null });
  }
}

export class DragDropContext extends React.Component {
  constructor(props) {
    super(props);

    this.dragDropContext = new DragDropContextCore();

    this.dragDropContext.dragEmitter.subscribe(({ data, clientOffset }) => {
      this.props.onChange({ data, clientOffset });
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
