import * as React from 'react';
import * as PropTypes from 'prop-types';

import { EventEmitter } from '@devexpress/dx-core';
import { DragDropContext } from './context';

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
    const { onChange } = this.props;

    this.dragDropProvider = new DragDropProviderCore();

    this.dragDropProvider.dragEmitter.subscribe(({ payload, clientOffset, end }) => {
      onChange({
        payload: end ? null : payload,
        clientOffset: end ? null : clientOffset,
      });
    });
  }

  shouldComponentUpdate(nextProps) {
    const { children } = this.props;
    return nextProps.children !== children;
  }

  render() {
    const { children } = this.props;
    return (
      <DragDropContext.Provider value={this.dragDropProvider}>
        {children}
      </DragDropContext.Provider>
    );
  }
}

DragDropProvider.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func,
};

DragDropProvider.defaultProps = {
  onChange: () => {},
};
