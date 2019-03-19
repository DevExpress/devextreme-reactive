/* eslint-disable import/no-extraneous-dependencies */
/* globals document:true */
import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { Popper } from 'react-popper';
import { Popover } from './popover';

describe('BS4 Popover', () => {
  const Content = () => (<div className="content" />);

  let container;
  let target;
  beforeEach(() => {
    container = document.createElement('div');
    container.className = 'container';
    document.body.appendChild(container);

    target = document.createElement('div');
    container.appendChild(target);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('rendering', () => {
    it('should render nothing if is not isOpen', () => {
      const tree = mount((
        <Popover target={target} isOpen={false}>
          <Content />
        </Popover>
      ), { attachTo: container });

      expect(tree.children()).toHaveLength(0);
    });

    it('should render Popper if isOpen', () => {
      const tree = mount((
        <Popover target={target} isOpen>
          <Content />
        </Popover>
      ), { attachTo: container });

      expect(tree.children()).toHaveLength(1);
      expect(tree.find(Popper).exists()).toBeTruthy();
    });

    it('should render correct elements', () => {
      const tree = mount((
        <Popover target={target} placement="bottom" isOpen>
          <Content />
        </Popover>
      ), { attachTo: container });

      expect(tree.find('.popover.show.bs-popover-undefined').exists()).toBeTruthy();
      expect(tree.find('.popover').children()).toHaveLength(2);
      expect(tree.find('.popover > .arrow').exists()).toBeTruthy();
      expect(tree.find('.popover > .popover-inner').exists()).toBeTruthy();
      expect(tree.find('.popover-inner').childAt(0).is(Content)).toBeTruthy();
    });

    it('should render outside a container if container is body', () => {
      mount((
        <Popover target={target} renderInBody isOpen>
          <Content />
        </Popover>
      ), { attachTo: container });

      expect(document.querySelector('body > .popover')).toBeTruthy();
      expect(container.querySelector('.popover')).toBeFalsy();
    });

    it('should render inside a container if container is not body', () => {
      mount((
        <Popover target={target} renderInBody={false} isOpen>
          <Content />
        </Popover>
      ), { attachTo: container });

      expect(document.querySelector('body > .popover')).toBeFalsy();
      expect(container.querySelector('.popover')).toBeTruthy();
    });

    it('should pass a target to the Popper', () => {
      const tree = mount((
        <Popover target={target} isOpen>
          <Content />
        </Popover>
      ), { attachTo: container });

      const popper = tree.find(Popper);
      expect(popper.prop('referenceElement')).toBe(target);
    });
  });

  describe('global click handler', () => {
    let handlers = {};
    beforeEach(() => {
      handlers = {};
      document.addEventListener = jest.fn((event, handler) => {
        handlers[event] = handler;
      });
      document.removeEventListener = jest.fn((event, handler) => {
        if (handlers[event] === handler) {
          delete handlers[event];
        }
      });
    });

    let clickHandler;
    let popoverTree;
    const mountPopover = () => {
      popoverTree = shallow((
        <Popover target={target} isOpen>
          <Content />
        </Popover>
      ));

      clickHandler = popoverTree.instance().handleClick;
    };
    const expectHandlersDetached = () => {
      expect(handlers).toEqual({});
    };

    it('should handle a click event if popover is isOpen', () => {
      mountPopover();

      expect(document.addEventListener)
        .toHaveBeenCalledWith('touchstart', clickHandler, true);
      expect(document.addEventListener)
        .toHaveBeenCalledWith('click', clickHandler, true);
    });

    it('should detach handlers if popover become invisible', () => {
      mountPopover();

      popoverTree.setProps({
        isOpen: false,
      });

      expectHandlersDetached();
    });

    it('should detach handlers on unmount', () => {
      mountPopover();

      popoverTree.unmount();

      expectHandlersDetached();
    });
  });

  describe('#handleClick', () => {
    it('should call toggle() when clicked outside popover', () => {
      const toggle = jest.fn();
      const tree = mount((
        <Popover target={target} toggle={toggle} isOpen>
          <Content />
        </Popover>
      ), { attachTo: container });
      const instance = tree.instance();

      instance.handleClick({ target: document.body });

      expect(toggle).toHaveBeenCalled();
    });

    it('should not call toggle() when clicked inside popover', () => {
      const toggle = jest.fn();
      let innerTarget;
      const setInnerRef = (node) => { innerTarget = node; };
      const tree = mount((
        <Popover target={target} toggle={toggle} isOpen>
          <div ref={setInnerRef} />
        </Popover>
      ), { attachTo: container });

      const instance = tree.instance();
      instance.handleClick({ target: innerTarget });

      expect(toggle).not.toHaveBeenCalled();
    });

    it('should not call toggle() when a target is clicked', () => {
      const toggle = jest.fn();
      const tree = mount((
        <Popover target={target} toggle={toggle} isOpen>
          <Content />
        </Popover>
      ), { attachTo: container });

      const instance = tree.instance();
      instance.handleClick({ target });

      expect(toggle).not.toHaveBeenCalled();
    });
  });
});
