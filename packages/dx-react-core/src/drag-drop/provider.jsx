import * as React from 'react';
import * as PropTypes from 'prop-types';

import { EventEmitter } from '@devexpress/dx-core';

class DragDropProviderCore {
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

export class DragDropProvider extends React.Component {
  constructor(props) {
    super(props);

    this.dragDropProvider = new DragDropProviderCore();

    this.dragDropProvider.dragEmitter.subscribe(({ payload, clientOffset, end }) => {
      this.props.onChange({
        payload: end ? null : payload,
        clientOffset: end ? null : clientOffset,
      });
    });
  }
  getChildContext() {
    return {
      dragDropProvider: this.dragDropProvider,
    };
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children;
  }
  render() {
    return this.props.children;
  }
}

DragDropProvider.childContextTypes = {
  dragDropProvider: PropTypes.object.isRequired,
};

DragDropProvider.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func,
};

DragDropProvider.defaultProps = {
  onChange: () => {},
};
