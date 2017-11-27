import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { Draggable } from '@devexpress/dx-react-core';
import { ResizingControl } from './resizing-control';

describe('ResizingControl', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should trigger onColumnResize with correct change on resize end', () => {
    const onColumnResize = jest.fn();
    const tree = mount((
      <ResizingControl
        onDraftColumnResize={() => {}}
        onColumnResize={onColumnResize}
      />
    ));

    tree.find(Draggable).prop('onStart')({ x: 0 });

    tree.find(Draggable).prop('onEnd')({ x: 10 });
    expect(onColumnResize)
      .toBeCalledWith({ shift: 10 });
  });

  it('should trigger onDraftColumnResize with correct change on resize update', () => {
    const onDraftColumnResize = jest.fn();
    const tree = mount((
      <ResizingControl
        onDraftColumnResize={onDraftColumnResize}
        onColumnResize={() => {}}
      />
    ));

    tree.find(Draggable).prop('onStart')({ x: 0 });

    tree.find(Draggable).prop('onUpdate')({ x: 10 });
    expect(onDraftColumnResize)
      .toBeCalledWith({ shift: 10 });
  });
});
