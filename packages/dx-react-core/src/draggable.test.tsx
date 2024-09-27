/* globals window:true document:true Event:true */

import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Draggable } from './draggable';
import { clear } from './draggable/selection-utils';
import { RefHolder } from './ref-holder';

jest.mock('./draggable/selection-utils', () => ({
  clear: jest.fn(),
}));

describe('Draggable', () => {
  let rootNode: HTMLElement;
  let tree: ReactWrapper;

  const dispatchEvent = (name, params, node = rootNode) => {
    const event = new Event(name, {
      bubbles: true,
      cancelable: true,
    });
    Object.assign(event, params);
    node!.dispatchEvent(event);
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

      const draggableNode = tree.find('div').getDOMNode() as HTMLElement;
      dispatchEvent('mousedown', { clientX: 10, clientY: 10 }, draggableNode);
      dispatchEvent('mousemove', { clientX: 30, clientY: 30 });

      expect(onStart)
        .toHaveBeenCalledTimes(1);
      expect(onStart)
        .toHaveBeenCalledWith({ x: 10, y: 10 });
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

      const draggableNode = tree.find('div').getDOMNode() as HTMLElement;
      dispatchEvent('mousedown', { clientX: 10, clientY: 10 }, draggableNode);

      const event = dispatchEvent('mousemove', { clientX: 30, clientY: 30 });
      expect(event.defaultPrevented)
        .toBeTruthy();
    });

    it('should clear text selection on dragging', () => {
      const onStart = jest.fn();

      tree = mount(
        <Draggable
          onStart={onStart}
        >
          <div />
        </Draggable>,
        { attachTo: rootNode },
      );

      const draggableNode = tree.find('div').getDOMNode() as HTMLElement;
      dispatchEvent('mousedown', { clientX: 10, clientY: 10 }, draggableNode);
      dispatchEvent('mousemove', { clientX: 30, clientY: 30 });

      expect(clear)
        .toHaveBeenCalled();
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

      const draggableNode = tree.find('div').getDOMNode() as HTMLElement;
      dispatchEvent('mousedown', { clientX: 10, clientY: 10 }, draggableNode);
      dispatchEvent('mousemove', { clientX: 30, clientY: 30 });
      dispatchEvent('mousemove', { clientX: 40, clientY: 40 });

      expect(onUpdate)
        .toHaveBeenCalledTimes(2);
      expect(onUpdate)
        .toHaveBeenCalledWith({ x: 30, y: 30 });
      expect(onUpdate)
        .toHaveBeenCalledWith({ x: 40, y: 40 });
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

      const draggableNode = tree.find('div').getDOMNode() as HTMLElement;
      dispatchEvent('mousedown', { clientX: 10, clientY: 10 }, draggableNode);
      dispatchEvent('mousemove', { clientX: 30, clientY: 30 });
      dispatchEvent('mouseup', { clientX: 30, clientY: 30 });

      expect(onEnd)
        .toHaveBeenCalledTimes(1);
      expect(onEnd)
        .toHaveBeenCalledWith({ x: 30, y: 30 });
    });

    it('should fire the "onEnd" callback on contextmenu', () => {
      const onEnd = jest.fn();

      tree = mount(
        <Draggable
          onEnd={onEnd}
        >
          <div />
        </Draggable>,
        { attachTo: rootNode },
      );

      const draggableNode = tree.find('div').getDOMNode() as HTMLElement;
      dispatchEvent('mousedown', { clientX: 10, clientY: 10 }, draggableNode);
      dispatchEvent('contextmenu', { clientX: 10, clientY: 10 });

      expect(onEnd)
        .toHaveBeenCalledTimes(1);
      expect(onEnd)
        .toHaveBeenCalledWith({ x: 10, y: 10 });
    });

    it('should enable gesture cover while dragging', () => {
      tree = mount(
        <Draggable>
          <div />
        </Draggable>,
        { attachTo: rootNode },
      );

      const draggableNode = tree.find('div').getDOMNode() as HTMLElement;
      dispatchEvent('mousedown', { clientX: 10, clientY: 10 }, draggableNode);

      dispatchEvent('mousemove', { clientX: 30, clientY: 30 });
      const bodyNodes = document.body.childNodes as NodeListOf<HTMLElement>;
      expect(bodyNodes[bodyNodes.length - 1].style.pointerEvents)
        .toBe('all');

      dispatchEvent('mouseup', { clientX: 30, clientY: 30 });
      expect(bodyNodes[bodyNodes.length - 1].style.pointerEvents)
        .toBe('none');
    });

    it('should work with one Draggable at a time', () => {
      const onStart1 = jest.fn();
      const onStart2 = jest.fn();

      tree = mount(
        <Draggable
          onStart={onStart1}
        >
          <div>
            <Draggable
              onStart={onStart2}
            >
              <div className="inner" />
            </Draggable>
          </div>
        </Draggable>,
        { attachTo: rootNode },
      );

      const draggableNode = tree.find('.inner').getDOMNode() as HTMLElement;
      dispatchEvent('mousedown', { clientX: 10, clientY: 10 }, draggableNode);
      dispatchEvent('mousemove', { clientX: 30, clientY: 30 });

      expect(onStart1)
        .toHaveBeenCalledTimes(0);
      expect(onStart2)
        .toHaveBeenCalledTimes(1);
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

      const draggableNode = tree.find('div').getDOMNode() as HTMLElement;
      dispatchEvent('touchstart', { touches: [{ clientX: 10, clientY: 10 }] }, draggableNode);
      jest.runAllTimers();

      expect(onStart)
        .toHaveBeenCalledTimes(1);
      expect(onStart)
        .toHaveBeenCalledWith({ x: 10, y: 10 });
    });

    it('should ignore the mouse event which is fired right after the touch one', () => {
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
      draggable.simulate('mousedown', { touches: [{ clientX: 10, clientY: 10 }] });
      dispatchEvent('mousemove', { clientX: 30, clientY: 30 });

      expect(onStart)
        .toHaveBeenCalledTimes(0);
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

      const draggableNode = tree.find('div').getDOMNode() as HTMLElement;
      dispatchEvent('touchstart', { touches: [{ clientX: 10, clientY: 10 }] }, draggableNode);
      jest.runAllTimers();

      const event = dispatchEvent('touchmove', {
        touches: [{ clientX: 20, clientY: 20 }], changedTouches: [{ clientX: 20, clientY: 20 }],
      });
      expect(event.defaultPrevented)
        .toBeTruthy();
    });

    it('should clear text selection on dragging', () => {
      const onStart = jest.fn();

      tree = mount(
        <Draggable
          onStart={onStart}
        >
          <div />
        </Draggable>,
        { attachTo: rootNode },
      );

      const draggableNode = tree.find('div').getDOMNode() as HTMLElement;
      dispatchEvent('touchstart', { touches: [{ clientX: 10, clientY: 10 }] }, draggableNode);
      jest.runAllTimers();
      dispatchEvent('touchmove', {
        touches: [{ clientX: 20, clientY: 20 }], changedTouches: [{ clientX: 20, clientY: 20 }],
      });

      expect(clear)
        .toHaveBeenCalled();
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

      const draggableNode = tree.find('div').getDOMNode() as HTMLElement;
      dispatchEvent('touchstart', { touches: [{ clientX: 10, clientY: 10 }] }, draggableNode);
      jest.runAllTimers();
      dispatchEvent('touchmove', {
        touches: [{ clientX: 20, clientY: 20 }], changedTouches: [{ clientX: 20, clientY: 20 }],
      });

      expect(onUpdate)
        .toHaveBeenCalledTimes(1);
      expect(onUpdate)
        .toHaveBeenCalledWith({ x: 20, y: 20 });
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

      const draggableNode = tree.find('div').getDOMNode() as HTMLElement;
      dispatchEvent('touchstart', { touches: [{ clientX: 10, clientY: 10 }] }, draggableNode);
      jest.runAllTimers();
      dispatchEvent('touchmove', { touches: [{ clientX: 20, clientY: 20 }] });
      dispatchEvent('touchend', { changedTouches: [{ clientX: 20, clientY: 20 }] });

      expect(onEnd)
        .toHaveBeenCalledTimes(1);
      expect(onEnd)
        .toHaveBeenCalledWith({ x: 20, y: 20 });
    });

    it('should work with one Draggable at a time', () => {
      const onStart1 = jest.fn();
      const onStart2 = jest.fn();

      tree = mount<any, any>(
        <Draggable
          onStart={onStart1}
        >
          <div>
            <Draggable
              onStart={onStart2}
            >
              <div className="inner" />
            </Draggable>
          </div>
        </Draggable>,
        { attachTo: rootNode },
      );

      const draggableNode = tree.find('.inner').getDOMNode() as HTMLElement;
      dispatchEvent('touchstart', { touches: [{ clientX: 10, clientY: 10 }] }, draggableNode);
      jest.runAllTimers();

      expect(onStart1)
        .toHaveBeenCalledTimes(0);
      expect(onStart2)
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('children', () => {
    it('should pass ref to children', () => {
      const elementRef = React.createRef<Element>();
      const ChildComponent = ({ forwardedRef }: any) => <div ref={forwardedRef}>Child Node</div>;

      tree = mount(
        <Draggable dragItem={elementRef}>
          <ChildComponent />
        </Draggable>,
        { attachTo: rootNode },
      );
      const child = tree.find(ChildComponent);
      const node = child?.getDOMNode();

      expect(child.exists()).toBe(true);
      expect(elementRef.current).toEqual(node);
    });

    describe('should wrap into RefHolder if children is not ReactElement', () => {
      ['Child String', 0, null].forEach((children) => {
        it(`children is "${typeof children}"`, () => {
          const elementRef = React.createRef<Element>();

          tree = mount(
            <Draggable dragItem={elementRef}>
              {children}
            </Draggable>,
            { attachTo: rootNode },
          );
          const child = tree.childAt(0);
          const node = child?.getDOMNode();

          expect(child.exists()).toBe(true);
          expect(child.type()).toBe(RefHolder);
          expect(child.props()).toEqual({ children });
          expect(elementRef.current).toEqual(node);
        });
      });
    });
  });

  describe('unmount', () => {
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
    it('should call mouse end callback', () => {
      const onEnd = jest.fn();
      tree = mount(
        <Draggable onEnd={onEnd}>
          <div />
        </Draggable>,
        { attachTo: rootNode },
      );

      const draggableNode = tree.find('div').getDOMNode() as HTMLElement;
      dispatchEvent('mousedown', { clientX: 10, clientY: 10 }, draggableNode);
      dispatchEvent('mousemove', { clientX: 30, clientY: 30 });

      tree.unmount();

      expect(onEnd)
        .toHaveBeenCalledTimes(1);
      expect(onEnd)
        .toHaveBeenCalledWith({ x: 30, y: 30 });
    });

    it('should call touch end callback', () => {
      const onEnd = jest.fn();

      tree = mount(
        <Draggable
          onEnd={onEnd}
        >
          <div />
        </Draggable>,
        { attachTo: rootNode },
      );

      const draggableNode = tree.find('div').getDOMNode() as HTMLElement;
      dispatchEvent('touchstart', { touches: [{ clientX: 10, clientY: 10 }] }, draggableNode);
      jest.runAllTimers();
      dispatchEvent('touchmove', {
        touches: [{ clientX: 20, clientY: 20 }], changedTouches: [{ clientX: 20, clientY: 20 }],
      });

      tree.unmount();

      expect(onEnd)
        .toHaveBeenCalledTimes(1);
      expect(onEnd)
        .toHaveBeenCalledWith({ x: 20, y: 20 });
    });
  });
});
