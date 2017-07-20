/* globals document:true Event:true */

import React from 'react';
import { mount } from 'enzyme';

import { Draggable } from './draggable';

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
  });

  describe('mouse', () => {
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

      expect(onStart.mock.calls)
        .toHaveLength(1);
      expect(onStart.mock.calls[0][0])
        .toEqual({ x: 10, y: 10 });
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

      expect(onUpdate.mock.calls)
        .toHaveLength(2);
      expect(onUpdate.mock.calls[0][0])
        .toEqual({ x: 30, y: 30 });
      expect(onUpdate.mock.calls[1][0])
        .toEqual({ x: 40, y: 40 });
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

      expect(onEnd.mock.calls)
        .toHaveLength(1);
      expect(onEnd.mock.calls[0][0])
        .toEqual({ x: 30, y: 30 });
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

      expect(onStart.mock.calls)
        .toHaveLength(1);
      expect(onStart.mock.calls[0][0])
        .toEqual({ x: 10, y: 10 });
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

      expect(onUpdate.mock.calls)
        .toHaveLength(1);
      expect(onUpdate.mock.calls[0][0])
        .toEqual({ x: 20, y: 20 });
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

      expect(onEnd.mock.calls)
        .toHaveLength(1);
      expect(onEnd.mock.calls[0][0])
        .toEqual({ x: 20, y: 20 });
    });
  });
});
