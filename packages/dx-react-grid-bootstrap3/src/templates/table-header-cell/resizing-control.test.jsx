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

  it('should trigger changeColumnWidth with correct change on resize end', () => {
    const changeColumnWidth = jest.fn();
    const tree = mount((
      <ResizingControl
        changeDraftColumnWidth={() => {}}
        changeColumnWidth={changeColumnWidth}
      />
    ));

    tree.find(Draggable).prop('onStart')({ x: 0 });

    tree.find(Draggable).prop('onEnd')({ x: 10 });
    expect(changeColumnWidth)
      .toBeCalledWith({ shift: 10 });
  });

  it('should trigger changeDraftColumnWidth with correct change on resize update', () => {
    const changeDraftColumnWidth = jest.fn();
    const tree = mount((
      <ResizingControl
        changeDraftColumnWidth={changeDraftColumnWidth}
        changeColumnWidth={() => {}}
      />
    ));

    tree.find(Draggable).prop('onStart')({ x: 0 });

    tree.find(Draggable).prop('onUpdate')({ x: 10 });
    expect(changeDraftColumnWidth)
      .toBeCalledWith({ shift: 10 });
  });
});
