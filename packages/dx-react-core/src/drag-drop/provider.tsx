import * as React from 'react';

import { EventEmitter } from '@devexpress/dx-core';
import { DragDropContext } from './context';

/** @internal */
export class DragDropProviderCore {
  payload: null;
  sources: any;
  dragEmitter: EventEmitter;

  constructor() {
    this.payload = null;
    this.sources = [];
    this.dragEmitter = new EventEmitter();
  }

  addSource(sourcePayload) {
    if (this.sources.findIndex(source => source.cellRef === sourcePayload.cellRef) === -1) {
      this.sources.push(sourcePayload);
    }
  }

  removeSource(sourcePayload) {
    const deleteIndex = this.sources.findIndex(source => source.cellRef === sourcePayload.cellRef);
    if (deleteIndex > -1) {
      this.sources.splice(deleteIndex, 1);
    }
  }

  start(payload, clientOffset) {
    this.payload = payload;
    this.dragEmitter.emit({ clientOffset, payload: this.payload });
  }

  update(clientOffset) {
    this.dragEmitter.emit({
      clientOffset, payload: this.payload, sources: this.sources,
    });
  }

  end(clientOffset) {
    this.dragEmitter.emit({ clientOffset, payload: this.payload, end: true });
    this.payload = null;
    this.sources = [];
  }
}

const defaultProps = {
  onChange: ({ payload, clientOffset, sources }) => {},
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

    this.dragDropProvider.dragEmitter.subscribe(({ payload, clientOffset, end, sources }) => {
      onChange({
        payload: end ? null : payload,
        clientOffset: end ? null : clientOffset,
        sources: end ? null : sources,
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
