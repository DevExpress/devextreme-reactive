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
    it('should fire the "onStart" callback on first mousemove', () => {
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
      dispatchEvent('mousemove', { clientX: 20, clientY: 20 });

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

      const event = dispatchEvent('mousemove', { clientX: 20, clientY: 20 });

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
      dispatchEvent('mousemove', { clientX: 20, clientY: 20 });
      dispatchEvent('mousemove', { clientX: 30, clientY: 30 });

      expect(onUpdate.mock.calls)
        .toHaveLength(1);
      expect(onUpdate.mock.calls[0][0])
        .toEqual({ x: 30, y: 30 });
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
      dispatchEvent('mousemove', { clientX: 20, clientY: 20 });
      dispatchEvent('mouseup', { clientX: 20, clientY: 20 });

      expect(onEnd.mock.calls)
        .toHaveLength(1);
      expect(onEnd.mock.calls[0][0])
        .toEqual({ x: 20, y: 20 });
    });
  });

  describe('touch', () => {
    it('should fire the "onStart" callback on first touchmove', () => {
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
      dispatchEvent('touchmove', { touches: [{ clientX: 20, clientY: 20 }] });

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
      dispatchEvent('touchmove', { touches: [{ clientX: 20, clientY: 20 }] });
      dispatchEvent('touchmove', { touches: [{ clientX: 30, clientY: 30 }] });

      expect(onUpdate.mock.calls)
        .toHaveLength(1);
      expect(onUpdate.mock.calls[0][0])
        .toEqual({ x: 30, y: 30 });
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
      dispatchEvent('touchmove', { touches: [{ clientX: 20, clientY: 20 }] });
      dispatchEvent('touchend', { changedTouches: [{ clientX: 20, clientY: 20 }] });

      expect(onEnd.mock.calls)
        .toHaveLength(1);
      expect(onEnd.mock.calls[0][0])
        .toEqual({ x: 20, y: 20 });
    });
  });
});
