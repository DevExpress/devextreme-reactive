import 'jsdom-global/register';
import * as React from 'react';
import { mount } from 'enzyme';

import { Draggable } from '../draggable';
import { DragDropProvider } from './provider';
import { DragSource } from './source';

describe('DragDropProvider', () => {
  it('should fire the "onStart", "onUpdate", "onEnd" callbacks while dragging a source', () => {
    const onStart = jest.fn();
    const onUpdate = jest.fn();
    const onEnd = jest.fn();
    const tree = mount((
      <DragDropProvider>
        <div>
          <DragSource
            payload="data"
            onStart={onStart}
            onUpdate={onUpdate}
            onEnd={onEnd}
          >
            <div className="source" />
          </DragSource>
        </div>
      </DragDropProvider>
    ));

    const draggable = tree.find(Draggable);

    draggable.prop('onStart')!({ x: 50, y: 50 });
    expect(onStart.mock.calls[0][0])
      .toEqual({ clientOffset: { x: 50, y: 50 } });

    draggable.prop('onUpdate')!({ x: 100, y: 100 });
    expect(onUpdate.mock.calls[0][0])
      .toEqual({ clientOffset: { x: 100, y: 100 } });

    draggable.prop('onEnd')!({ x: 100, y: 100 });
    expect(onEnd.mock.calls[0][0])
      .toEqual({ clientOffset: { x: 100, y: 100 } });
  });
});
