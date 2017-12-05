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

  it('should trigger onWidthChange with correct change on resize end', () => {
    const onWidthChange = jest.fn();
    const tree = mount((
      <ResizingControl
        onDraftWidthChange={() => {}}
        onWidthChange={onWidthChange}
      />
    ));

    tree.find(Draggable).prop('onStart')({ x: 0 });

    tree.find(Draggable).prop('onEnd')({ x: 10 });
    expect(onWidthChange)
      .toBeCalledWith({ shift: 10 });
  });

  it('should trigger onDraftWidthChange with correct change on resize update', () => {
    const onDraftWidthChange = jest.fn();
    const tree = mount((
      <ResizingControl
        onDraftWidthChange={onDraftWidthChange}
        onWidthChange={() => {}}
      />
    ));

    tree.find(Draggable).prop('onStart')({ x: 0 });

    tree.find(Draggable).prop('onUpdate')({ x: 10 });
    expect(onDraftWidthChange)
      .toBeCalledWith({ shift: 10 });
  });
});
