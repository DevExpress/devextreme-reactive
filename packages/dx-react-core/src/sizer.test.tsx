import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { Sizer } from './sizer';

describe('Sizer', () => {
  const Container = ({ forwardedRef, ...restProps }) => (
    <div ref={forwardedRef} className="container" {...restProps} />
  );
  const onSizeChange = jest.fn();
  class mockRef {
    constructor() {}
    getMocks() {
      return {
        clientHeight: 10,
        clientWidth: 20,
        style: {},
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
      }
    }
  }

  it('should create component with childrens', () => {
    const tree = mount(
      <Sizer
        onSizeChange={onSizeChange}
        containerComponent={Container}
        style={{ key: 'test style' }}
      />,
    );

    const root = tree.find('.container');
    expect(root.props()).toMatchObject({
      className: "container",
      style: {
        key: 'test style',
        position: 'relative',
      }
    });
    expect(root.find('div').get(1).props).toMatchObject({
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        zIndex: -1,
        visibility: 'hidden',
        opacity: 0,
      }
    });
    expect(root.find('div').get(2).props).toMatchObject({
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        overflow: 'auto',
      }
    });
    expect(root.find('div').get(3)).not.toBeUndefined();
    expect(root.find('div').get(4).props).toMatchObject({
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        overflow: 'auto',
        minHeight: '1px',
        minWidth: '1px',
      }
    });
    expect(root.find('div').get(5).props).toMatchObject({
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '200%',
        height: '200%',
        minHeight: '2px',
        minWidth: '2px',
      }
    });
  });

  it('should set scroll offsets to notifiers on mount', () => {
    const tree = shallow(
      <Sizer
        onSizeChange={onSizeChange}
        containerComponent={Container}
        style={{ key: 'test style' }}
      />, { disableLifecycleMethods: true }
    );
    const instance = tree.instance() as any;
    instance.rootRef = { current: (new mockRef).getMocks() };
    instance.expandTriggerRef = { current: (new mockRef).getMocks() };
    instance.contractTriggerRef = { current: (new mockRef).getMocks() };
    instance.expandNotifierRef = { current: (new mockRef).getMocks() };

    instance.componentDidMount();

    expect(instance.expandNotifierRef.current.style.width).toBe('22px');
    expect(instance.expandNotifierRef.current.style.height).toBe('12px');
    
    expect(instance.contractTriggerRef.current.scrollTop).toBe(10);
    expect(instance.contractTriggerRef.current.scrollLeft).toBe(20);

    expect(instance.expandTriggerRef.current.scrollTop).toBe(2);
    expect(instance.expandTriggerRef.current.scrollLeft).toBe(2);

    expect(onSizeChange).toBeCalledWith({ width: 20, height: 10 });
  });

  it('should subscribe to the addEventListener on mount', () => {
    const tree = shallow(
      <Sizer
        onSizeChange={onSizeChange}
        containerComponent={Container}
      />, { disableLifecycleMethods: true }
    );
    const instance = tree.instance() as any;
    instance.rootRef = { current: (new mockRef).getMocks() };
    instance.expandTriggerRef = { current: (new mockRef).getMocks() };
    instance.contractTriggerRef = { current: (new mockRef).getMocks() };
    instance.expandNotifierRef = { current: (new mockRef).getMocks() };

    instance.componentDidMount();

    expect(instance.expandTriggerRef.current.addEventListener).toBeCalled();
    expect(instance.contractTriggerRef.current.addEventListener).toBeCalled();
  });

  it('should call onSizeChange on mount', () => {
    const tree = shallow(
      <Sizer
        onSizeChange={onSizeChange}
        containerComponent={Container}
        style={{ key: 'test style' }}
      />, { disableLifecycleMethods: true }
    );
    const instance = tree.instance() as any;
    instance.rootRef = { current: (new mockRef).getMocks() };
    instance.expandTriggerRef = { current: (new mockRef).getMocks() };
    instance.contractTriggerRef = { current: (new mockRef).getMocks() };
    instance.expandNotifierRef = { current: (new mockRef).getMocks() };

    instance.componentDidMount();

    expect(onSizeChange).toBeCalledWith({ width: 20, height: 10 });
  });

  it('should update scroll offsets to rootNode', () => {
    const tree = shallow(
      <Sizer
        onSizeChange={onSizeChange}
        containerComponent={Container}
        scrollTop={35}
        scrollLeft={45}
      />, { disableLifecycleMethods: true }
    );
    const instance = tree.instance() as any;
    instance.rootRef = { current: (new mockRef).getMocks() };
    instance.expandTriggerRef = { current: (new mockRef).getMocks() };
    instance.contractTriggerRef = { current: (new mockRef).getMocks() };
    instance.expandNotifierRef = { current: (new mockRef).getMocks() };

    instance.componentDidMount();
    instance.componentDidUpdate();

    expect(instance.rootRef.current.scrollTop).toBe(35);
    expect(instance.rootRef.current.scrollLeft).toBe(45);
  });

  //T1096930
  it('should update scroll offsets to notifiers', () => {
    const tree = shallow(
      <Sizer
        onSizeChange={onSizeChange}
        containerComponent={Container}
      />, { disableLifecycleMethods: true }
    );
    const instance = tree.instance() as any;
    instance.rootRef = { current: (new mockRef).getMocks() };
    instance.expandTriggerRef = { current: (new mockRef).getMocks() };
    instance.contractTriggerRef = { current: (new mockRef).getMocks() };
    instance.expandNotifierRef = { current: (new mockRef).getMocks() };

    instance.componentDidMount();
    // after column reordering scroll offsets are resets
    instance.contractTriggerRef.current.scrollTop = 0;
    instance.contractTriggerRef.current.scrollLeft = 0;
    instance.expandTriggerRef.current.scrollTop = 0;
    instance.expandTriggerRef.current.scrollLeft= 0;
    instance.componentDidUpdate();

    expect(instance.contractTriggerRef.current.scrollTop).toBe(10);
    expect(instance.contractTriggerRef.current.scrollLeft).toBe(20);

    expect(instance.expandTriggerRef.current.scrollTop).toBe(2);
    expect(instance.expandTriggerRef.current.scrollLeft).toBe(2);
  });
});
