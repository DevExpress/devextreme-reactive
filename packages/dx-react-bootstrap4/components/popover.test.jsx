/* eslint-disable import/no-extraneous-dependencies */
/* globals document:true */
import * as React from 'react';
import * as mockReactDOM from 'react-dom';

import { Popper } from 'react-popper';
import { Popover } from './popover';
import { create } from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils'; 

jest.mock('react-dom', () => ({
  ...mockReactDOM,
  createPortal: jest.fn(element => element),
}));

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
      const tree = create(
        <Popover target={target} isOpen={false}>
          <Content />
        </Popover>
      );

      expect(tree.root.children).toHaveLength(0);
    });

    it('should render Popper if isOpen', () => {
      const tree = create(
        <Popover target={target} isOpen>
          <Content />
        </Popover>
      );

      expect(tree.root.children).toHaveLength(1);
      expect(tree.root.find(Popper)).not.toBeNull();
    });

    it('should render correct elements', () => {
      const tree = create((
        <Popover target={target} placement="bottom" isOpen>
          <Content />
        </Popover>
      ), container);
      expect(tree.root.findByProps({className:'popover show bs-popover-undefined'})).not.toBeNull();
      expect(tree.root.findByProps({className:'popover show bs-popover-undefined'}).children).toHaveLength(2);
      expect(tree.root.findAllByProps({className:'.arrow'})).not.toBeNull();
      expect(tree.root.findByProps({className:'popover-inner'}).parent.props.className).toBe('popover show bs-popover-undefined');
      expect(tree.root.findByProps({className:'popover-inner'}).find(Content)).not.toBeNull();
    });

    it('should render custom arrow component', () => {
      const ArrowComponent = () => null;
      const tree = create((
        <Popover target={target} placement="bottom" isOpen arrowComponent={ArrowComponent}>
          <Content />
        </Popover>
      ), container);
      expect(tree.root.findByType(ArrowComponent)).toBeTruthy();
    });

    it('should render outside a container if container is body', () => {
      create((
        <Popover target={target} renderInBody isOpen>
          <Content />
        </Popover>
      ), container);
      expect(container.querySelector('.popover')).toBeNull();
      expect(document.querySelector('body').getElementsByClassName('popover')).not.toBeNull();
    });

    it('should render inside a container if container is not body', () => {
      create((
        <Popover target={target} renderInBody={false} isOpen>
          <Content />
        </Popover>
      ), container);

      expect(document.querySelector('body').getElementsByClassName('popover')).not.toBeNull();
      expect(container.getElementsByClassName('popover')).toBeTruthy();
    });

    it('should pass a target to the Popper', () => {
      const tree = create((
        <Popover target={target} isOpen>
          <Content />
        </Popover>
    ), container);
    const popper = tree.root.findByType(Popper);
      expect(popper.props.target.outerHTML).toBe('<div></div>');
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

    const popoverComponent = (props = {}) => {
      return(
        <Popover target={target} isOpen toggle={() => {}} {...props}>
          <Content />
        </Popover>
      );
    }

    const renderPopover = () => {
      const tree = create(popoverComponent());

      const clickHandler = tree.getInstance().handleClick;
      return {tree, clickHandler};
    };
  
    it('should handle a click event if popover is isOpen and toggle is defined', () => {
      const { clickHandler } = renderPopover();

      expect(addEventListener.mock.calls).toEqual([
        ['click', clickHandler, true],
        ['touchstart', clickHandler, true],
      ]);
    });

    it('should detach handlers if popover becomes invisible', () => {
      const { tree, clickHandler } = renderPopover();
      tree.update(popoverComponent({isOpen: false}))

      expect(removeEventListener.mock.calls).toEqual([
        ['click', clickHandler, true],
        ['touchstart', clickHandler, true],
      ]);
    });

    it('should detach handlers if toggle is not defined', () => {
      const { tree, clickHandler } = renderPopover();

      tree.update(popoverComponent({toggle: null}))


      expect(removeEventListener.mock.calls).toEqual([
        ['click', clickHandler, true],
        ['touchstart', clickHandler, true],
      ]);
    });

    it('should detach handlers on unmount', () => {
      const { tree, clickHandler } = renderPopover();

      tree.unmount();

      expect(removeEventListener.mock.calls).toEqual([
        ['click', clickHandler, true],
        ['touchstart', clickHandler, true],
      ]);
    });

    it('should add event listeners only once', () => {
      const { tree, clickHandler } = renderPopover();
      tree.update(popoverComponent({children: <div />}))

      expect(addEventListener.mock.calls).toEqual([
        ['click', clickHandler, true],
        ['touchstart', clickHandler, true],
      ]);
    });

    it('should remove event listerners only once', () => {
      const { tree, clickHandler } = renderPopover();
      tree.update(popoverComponent({ isOpen: false }));

      tree.unmount();

      expect(removeEventListener).toBeCalledTimes(2);
      expect(removeEventListener.mock.calls).toEqual([
        ['click', clickHandler, true],
        ['touchstart', clickHandler, true],
      ]);
    });
  });

  describe('#handleClick', () => {
    it.only('should call toggle() when clicked outside popover', () => {
      const toggle = jest.fn();
      const tree = create((
        <Popover target={target} toggle={toggle} isOpen>
          <Content />
        </Popover>
      ), container);
      const node = tree.root.findByType(Popover)
      tree.update(<Popover target={document.body}>
        <Content />
      </Popover>);
     ReactTestUtils.Simulate.click(node);

      expect(toggle).toHaveBeenCalled();
    });

    it('should not call toggle() when clicked inside popover', () => {
      const toggle = jest.fn();
      let innerTarget;
      const setInnerRef = (node) => { innerTarget = node; };
      const tree = create((
        <Popover target={target} toggle={toggle} isOpen>
          <div ref={setInnerRef} />
        </Popover>
      ), { attachTo: container });

      const instance = tree.getInstance();
      instance.handleClick({ target: innerTarget });

      expect(toggle).not.toHaveBeenCalled();
    });

    it('should not call toggle() when a target is clicked', () => {
      const toggle = jest.fn();
      const tree = create((
        <Popover target={target} toggle={toggle} isOpen>
          <Content />
        </Popover>
      ), { attachTo: container });

      const instance = tree.getInstance();
      instance.handleClick({ target });

      expect(toggle).not.toHaveBeenCalled();
    });
  });
});
