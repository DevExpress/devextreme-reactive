/* globals document:true Element:true */

import React from 'react';
import { mount } from 'enzyme';

import { Draggable } from '../draggable';
import { DragDropContext } from './context';
import { DragSource } from './source';
import { DropTarget } from './target';

describe('DropTarget', () => {
  let getRect;

  beforeEach(() => {
    getRect = jest.spyOn(Element.prototype, 'getBoundingClientRect');
  });

  afterEach(() => {
    getRect.mockRestore();
  });

  it('should fire the "onEnter" callback when source is over target', () => {
    getRect.mockImplementation(() =>
      ({ top: 100, left: 100, width: 100, height: 100, right: 200, bottom: 200 }));

    const onEnter = jest.fn();
    const tree = mount(
      <DragDropContext>
        <div>
          <DragSource
            getPayload={() => []}
          >
            <div className="source" />
          </DragSource>
          <DropTarget
            onEnter={onEnter}
          >
            <div className="target" />
          </DropTarget>
        </div>
      </DragDropContext>,
    );

    const draggable = tree.find(Draggable);

    draggable.prop('onStart')({ x: 50, y: 50 });
    draggable.prop('onUpdate')({ x: 100, y: 100 });

    expect(onEnter.mock.calls)
      .toHaveLength(1);
  });

  it('should fire the "onOver" callback when source is over target', () => {
    getRect.mockImplementation(() =>
      ({ top: 100, left: 100, width: 100, height: 100, right: 200, bottom: 200 }));

    const onOver = jest.fn();
    const tree = mount(
      <DragDropContext>
        <div>
          <DragSource
            getPayload={() => []}
          >
            <div className="source" />
          </DragSource>
          <DropTarget
            onOver={onOver}
          >
            <div className="target" />
          </DropTarget>
        </div>
      </DragDropContext>,
    );

    const draggable = tree.find(Draggable);

    draggable.prop('onStart')({ x: 50, y: 50 });
    draggable.prop('onUpdate')({ x: 100, y: 100 });
    draggable.prop('onUpdate')({ x: 150, y: 150 });

    expect(onOver.mock.calls)
      .toHaveLength(1);
  });

  it('should fire the "onLeave" callback when source is over target', () => {
    getRect.mockImplementation(() =>
      ({ top: 100, left: 100, width: 100, height: 100, right: 200, bottom: 200 }));

    const onLeave = jest.fn();
    const tree = mount(
      <DragDropContext>
        <div>
          <DragSource
            getPayload={() => []}
          >
            <div className="source" />
          </DragSource>
          <DropTarget
            onLeave={onLeave}
          >
            <div className="target" />
          </DropTarget>
        </div>
      </DragDropContext>,
    );

    const draggable = tree.find(Draggable);

    draggable.prop('onStart')({ x: 50, y: 50 });
    draggable.prop('onUpdate')({ x: 100, y: 100 });
    draggable.prop('onUpdate')({ x: 300, y: 300 });

    expect(onLeave.mock.calls)
      .toHaveLength(1);
  });

  it('should fire the "onDrop" callback when source is over target', () => {
    getRect.mockImplementation(() =>
      ({ top: 100, left: 100, width: 100, height: 100, right: 200, bottom: 200 }));

    const onDrop = jest.fn();
    const tree = mount(
      <DragDropContext>
        <div>
          <DragSource
            getPayload={() => []}
          >
            <div className="source" />
          </DragSource>
          <DropTarget
            onDrop={onDrop}
          >
            <div className="target" />
          </DropTarget>
        </div>
      </DragDropContext>,
    );

    const draggable = tree.find(Draggable);

    draggable.prop('onStart')({ x: 50, y: 50 });
    draggable.prop('onUpdate')({ x: 100, y: 100 });
    draggable.prop('onEnd')({ x: 100, y: 100 });

    expect(onDrop.mock.calls)
      .toHaveLength(1);
  });
});
