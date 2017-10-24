/* globals window:true document:true Event:true */

import React from 'react';
import { mount } from 'enzyme';
// eslint-disable-next-line camelcase
import { unstable_batchedUpdates } from 'react-dom';
import { Draggable } from './draggable';

jest.mock('react-dom', () => {
  const ReactDOM = require.requireActual('react-dom');
  jest.spyOn(ReactDOM, 'unstable_batchedUpdates');
  return ReactDOM;
});

describe('Draggable', () => {
  let rootNode = null;
  let tree = null;

  const dispatchEvent = (name, params) => {
    const event = new Event(name, {
      bubbles: true,
      cancelable: true,
    });
    Object.assign(event, params);
    rootNode.dispatchEvent(event);
    return event;
  };

  beforeAll(() => {
    rootNode = document.createElement('div');
    document.body.appendChild(rootNode);
  });

  afterEach(() => {
    tree.detach();
    jest.clearAllMocks();
  });

  describe('mouse', () => {
    const { elementFromPoint } = document;
    const { getComputedStyle } = window;
    beforeEach(() => {
      document.elementFromPoint = jest.fn();
      window.getComputedStyle = jest.fn().mockImplementation(() => ({ style: { cursor: '' } }));
    });
    afterEach(() => {
      document.elementFromPoint = elementFromPoint;
      window.getComputedStyle = getComputedStyle;
    });

    it('should fire the "onStart" callback on first mousemove that cross bound', () => {
      const onStart = jest.fn();

      tree = mount(
        <Draggable
          onStart={onStart}
        >
          <div />
        </Draggable>,
        { attachTo: rootNode },
      );

      const draggable = tree.find('div');
      draggable.simulate('mousedown', { clientX: 10, clientY: 10 });
      dispatchEvent('mousemove', { clientX: 30, clientY: 30 });

      expect(onStart)
        .toHaveBeenCalledTimes(1);
      expect(onStart)
        .toHaveBeenCalledWith({ x: 10, y: 10 });
      expect(unstable_batchedUpdates)
        .toHaveBeenCalledTimes(1);
    });

    it('should prevent default browser behavior on dragging', () => {
      const onStart = jest.fn();

      tree = mount(
        <Draggable
          onStart={onStart}
        >
          <div />
        </Draggable>,
        { attachTo: rootNode },
      );

      const draggable = tree.find('div');
      draggable.simulate('mousedown', { clientX: 10, clientY: 10 });

      const event = dispatchEvent('mousemove', { clientX: 30, clientY: 30 });

      expect(event.defaultPrevented)
        .toBeTruthy();
    });

    it('should fire the "onUpdate" callback on mousemove', () => {
      const onUpdate = jest.fn();

      tree = mount(
        <Draggable
          onUpdate={onUpdate}
        >
          <div />
        </Draggable>,
        { attachTo: rootNode },
      );

      const draggable = tree.find('div');
      draggable.simulate('mousedown', { clientX: 10, clientY: 10 });
      dispatchEvent('mousemove', { clientX: 30, clientY: 30 });
      dispatchEvent('mousemove', { clientX: 40, clientY: 40 });

      expect(onUpdate)
        .toHaveBeenCalledTimes(2);
      expect(onUpdate)
        .toHaveBeenCalledWith({ x: 30, y: 30 });
      expect(onUpdate)
        .toHaveBeenCalledWith({ x: 40, y: 40 });
      expect(unstable_batchedUpdates)
        .toHaveBeenCalledTimes(2);
    });

    it('should fire the "onEnd" callback on mouseup', () => {
      const onEnd = jest.fn();

      tree = mount(
        <Draggable
          onEnd={onEnd}
        >
          <div />
        </Draggable>,
        { attachTo: rootNode },
      );

      const draggable = tree.find('div');
      draggable.simulate('mousedown', { clientX: 10, clientY: 10 });
      dispatchEvent('mousemove', { clientX: 30, clientY: 30 });
      dispatchEvent('mouseup', { clientX: 30, clientY: 30 });

      expect(onEnd)
        .toHaveBeenCalledTimes(1);
      expect(onEnd)
        .toHaveBeenCalledWith({ x: 30, y: 30 });
      expect(unstable_batchedUpdates)
        .toHaveBeenCalledTimes(1);
    });

    it('should enable gesture cover while dragging', () => {
      tree = mount(
        <Draggable>
          <div />
        </Draggable>,
        { attachTo: rootNode },
      );

      const draggable = tree.find('div');
      draggable.simulate('mousedown', { clientX: 10, clientY: 10 });

      dispatchEvent('mousemove', { clientX: 30, clientY: 30 });
      const bodyNodes = document.body.childNodes;
      expect(bodyNodes[bodyNodes.length - 1].style.pointerEvents)
        .toBe('all');

      dispatchEvent('mouseup', { clientX: 30, clientY: 30 });
      expect(bodyNodes[bodyNodes.length - 1].style.pointerEvents)
        .toBe('none');
    });
  });

  describe('touch', () => {
    jest.useFakeTimers();

    it('should fire the "onStart" callback on after timeout', () => {
      const onStart = jest.fn();

      tree = mount(
        <Draggable
          onStart={onStart}
        >
          <div />
        </Draggable>,
        { attachTo: rootNode },
      );

      const draggable = tree.find('div');
      draggable.simulate('touchstart', { touches: [{ clientX: 10, clientY: 10 }] });
      jest.runAllTimers();

      expect(onStart)
        .toHaveBeenCalledTimes(1);
      expect(onStart)
        .toHaveBeenCalledWith({ x: 10, y: 10 });
      expect(unstable_batchedUpdates)
        .toHaveBeenCalledTimes(1);
    });

    it('should prevent default browser behavior on dragging', () => {
      const onStart = jest.fn();

      tree = mount(
        <Draggable
          onStart={onStart}
        >
          <div />
        </Draggable>,
        { attachTo: rootNode },
      );

      const draggable = tree.find('div');
      draggable.simulate('touchstart', { touches: [{ clientX: 10, clientY: 10 }] });
      jest.runAllTimers();
      const event = dispatchEvent('touchmove', { touches: [{ clientX: 20, clientY: 20 }] });

      expect(event.defaultPrevented)
        .toBeTruthy();
    });

    it('should fire the "onUpdate" callback on touchmove', () => {
      const onUpdate = jest.fn();

      tree = mount(
        <Draggable
          onUpdate={onUpdate}
        >
          <div />
        </Draggable>,
        { attachTo: rootNode },
      );

      const draggable = tree.find('div');
      draggable.simulate('touchstart', { touches: [{ clientX: 10, clientY: 10 }] });
      jest.runAllTimers();
      dispatchEvent('touchmove', { touches: [{ clientX: 20, clientY: 20 }] });

      expect(onUpdate)
        .toHaveBeenCalledTimes(1);
      expect(onUpdate)
        .toHaveBeenCalledWith({ x: 20, y: 20 });
      expect(unstable_batchedUpdates)
        .toHaveBeenCalledTimes(1);
    });

    it('should fire the "onEnd" callback on touchend', () => {
      const onEnd = jest.fn();

      tree = mount(
        <Draggable
          onEnd={onEnd}
        >
          <div />
        </Draggable>,
        { attachTo: rootNode },
      );

      const draggable = tree.find('div');
      draggable.simulate('touchstart', { touches: [{ clientX: 10, clientY: 10 }] });
      jest.runAllTimers();
      dispatchEvent('touchmove', { touches: [{ clientX: 20, clientY: 20 }] });
      dispatchEvent('touchend', { changedTouches: [{ clientX: 20, clientY: 20 }] });

      expect(onEnd)
        .toHaveBeenCalledTimes(1);
      expect(onEnd)
        .toHaveBeenCalledWith({ x: 20, y: 20 });
      expect(unstable_batchedUpdates)
        .toHaveBeenCalledTimes(1);
    });
  });
});
