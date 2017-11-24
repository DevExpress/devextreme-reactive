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

  it('should trigger onColumnWidthChange with correct change on resize end', () => {
    const onColumnWidthChange = jest.fn();
    const tree = mount((
      <ResizingControl
        onDraftColumnWidthChange={() => {}}
        onColumnWidthChange={onColumnWidthChange}
      />
    ));

    tree.find(Draggable).prop('onStart')({ x: 0 });

    tree.find(Draggable).prop('onEnd')({ x: 10 });
    expect(onColumnWidthChange)
      .toBeCalledWith({ shift: 10 });
  });

  it('should trigger onDraftColumnWidthChange with correct change on resize update', () => {
    const onDraftColumnWidthChange = jest.fn();
    const tree = mount((
      <ResizingControl
        onDraftColumnWidthChange={onDraftColumnWidthChange}
        onColumnWidthChange={() => {}}
      />
    ));

    tree.find(Draggable).prop('onStart')({ x: 0 });

    tree.find(Draggable).prop('onUpdate')({ x: 10 });
    expect(onDraftColumnWidthChange)
      .toBeCalledWith({ shift: 10 });
  });
});
