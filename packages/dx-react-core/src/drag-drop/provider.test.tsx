import * as React from 'react';
import { mount } from 'enzyme';

import { Draggable } from '../draggable';
import { DragDropProvider } from './provider';
import { DragSource } from './source';

describe('DragDropProvider', () => {
  it('should fire the "onChange" callback while dragging a source', () => {
    const onChange = jest.fn();
    const tree = mount((
      <DragDropProvider
        onChange={onChange}
      >
        <div>
          <DragSource
            payload="data"
          >
            <div className="source" />
          </DragSource>
        </div>
      </DragDropProvider>
    ));

    const draggable = tree.find(Draggable);

    draggable.prop('onStart')!({ x: 50, y: 50 });

    expect(onChange.mock.calls[0][0])
      .toEqual({ payload: 'data', clientOffset: { x: 50, y: 50 } });

    onChange.mockReset();
    draggable.prop('onUpdate')!({ x: 100, y: 100 });

    expect(onChange.mock.calls[0][0])
      .toEqual({ payload: 'data', clientOffset: { x: 100, y: 100 } });

    onChange.mockReset();
    draggable.prop('onEnd')!({ x: 100, y: 100 });

    expect(onChange.mock.calls[0][0])
      .toEqual({ payload: null, clientOffset: null });
  });
});
