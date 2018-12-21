import * as React from 'react';

import { EventEmitter } from '@devexpress/dx-core';
import { DragDropContext } from './context';

/** @internal */
export class DragDropProviderCore {
  payload: null;
  dragEmitter: EventEmitter;

  constructor() {
    this.payload = null;
    this.dragEmitter = new EventEmitter();
  }

  start(payload, clientOffset) {
    this.payload = payload;
    this.dragEmitter.emit({ clientOffset, payload: this.payload });
  }

  update(clientOffset) {
    this.dragEmitter.emit({ clientOffset, payload: this.payload });
  }

  end(clientOffset) {
    this.dragEmitter.emit({ clientOffset, payload: this.payload, end: true });
    this.payload = null;
  }
}

const defaultProps = {
  onChange: ({ payload, clientOffset }) => {},
};
type DragDropProviderDefaultProps = Readonly<typeof defaultProps>;
type DragDropProviderProps = Partial<DragDropProviderDefaultProps>;

/** @internal */
// tslint:disable-next-line: max-classes-per-file
export class DragDropProvider extends React.Component<
  DragDropProviderProps & DragDropProviderDefaultProps
> {
  static defaultProps = defaultProps;
  dragDropProvider: DragDropProviderCore;

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
