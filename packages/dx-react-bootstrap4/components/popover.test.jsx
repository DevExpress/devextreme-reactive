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
      expect(tree.find('.arrow').exists()).toBeTruthy();
      expect(tree.find('.popover > .popover-inner').exists()).toBeTruthy();
      expect(tree.find('.popover-inner').childAt(0).is(Content)).toBeTruthy();
    });

    it('should render custom arrow component', () => {
      const ArrowComponent = () => null;
      const tree = mount((
        <Popover target={target} placement="bottom" isOpen arrowComponent={ArrowComponent}>
          <Content />
        </Popover>
      ), { attachTo: container });
      expect(tree.find(ArrowComponent).exists()).toBeTruthy();
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
    let addEventListener;
    let removeEventListener;

    beforeAll(() => {
      addEventListener = jest.spyOn(document, 'addEventListener').mockImplementation(() => 0);
      removeEventListener = jest.spyOn(document, 'removeEventListener').mockImplementation(() => 0);
    });
    afterAll(() => {
      addEventListener.mockRestore();
      removeEventListener.mockRestore();
    });
    afterEach(() => {
      addEventListener.mockReset();
      removeEventListener.mockReset();
    });

    let clickHandler;
    let popoverTree;
    const mountPopover = () => {
      popoverTree = shallow((
        <Popover target={target} isOpen toggle={() => {}}>
          <Content />
        </Popover>
      ));

      clickHandler = popoverTree.instance().handleClick;
    };

    it('should handle a click event if popover is isOpen and toggle is defined', () => {
      mountPopover();

      expect(addEventListener.mock.calls).toEqual([
        ['click', clickHandler, true],
        ['touchstart', clickHandler, true],
      ]);
    });

    it('should detach handlers if popover becomes invisible', () => {
      mountPopover();

      popoverTree.setProps({
        isOpen: false,
      });

      expect(removeEventListener.mock.calls).toEqual([
        ['click', clickHandler, true],
        ['touchstart', clickHandler, true],
      ]);
    });

    it('should detach handlers if toggle is not defined', () => {
      mountPopover();

      popoverTree.setProps({
        toggle: null,
      });

      expect(removeEventListener.mock.calls).toEqual([
        ['click', clickHandler, true],
        ['touchstart', clickHandler, true],
      ]);
    });

    it('should detach handlers on unmount', () => {
      mountPopover();

      popoverTree.unmount();

      expect(removeEventListener.mock.calls).toEqual([
        ['click', clickHandler, true],
        ['touchstart', clickHandler, true],
      ]);
    });

    it('should add event listeners only once', () => {
      mountPopover();

      popoverTree.setProps({
        children: <div />,
      });

      expect(addEventListener.mock.calls).toEqual([
        ['click', clickHandler, true],
        ['touchstart', clickHandler, true],
      ]);
    });

    it('should remove event listerners only once', () => {
      mountPopover();

      popoverTree.setProps({ isOpen: false });
      popoverTree.unmount();

      expect(removeEventListener).toBeCalledTimes(2);
      expect(removeEventListener.mock.calls).toEqual([
        ['click', clickHandler, true],
        ['touchstart', clickHandler, true],
      ]);
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
