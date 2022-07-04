import * as React from 'react';
import { mount } from 'enzyme';
import { Sizer } from './sizer';

describe('Sizer', () => {
  const divProto = (document.createElement('div') as HTMLDivElement).constructor.prototype;
  let addEventListener: any;
  let removeEventListener: any;
  const Container = ({ forwardedRef, ...restProps }) => (
    <div ref={forwardedRef} className="container" {...restProps} />
  );
  const onSizeChange = jest.fn();
  beforeAll(() => {
    addEventListener = divProto.addEventListener;
    removeEventListener = divProto.removeEventListener;
    divProto.addEventListener = jest.fn();
    divProto.removeEventListener = jest.fn();
  });

  afterAll(() => {
    divProto.addEventListener = addEventListener;
    divProto.removeEventListener = removeEventListener;
  });

  afterEach(() => {
    divProto.addEventListener.mockClear();
    divProto.removeEventListener.mockClear();
    onSizeChange.mockClear();
  });

  it('should create component with childrens', () => {
    const tree = mount(
      <Sizer
        onSizeChange={onSizeChange}
        containerComponent={Container}
        style={{ key: 'test style' }}
      />,
    );

    const root = tree.find('.container');
    expect(root.props()).toEqual({
      className: 'container',
      style: {
        key: 'test style',
        position: 'relative',
      },
    });
    expect(root.getDOMNode().childNodes.length).toBe(1);
    expect(root.getDOMNode().childNodes[0].childNodes.length).toBe(2);
    expect(root.getDOMNode().childNodes[0].childNodes[0].childNodes.length).toBe(1);
    expect(root.getDOMNode().childNodes[0].childNodes[1].childNodes.length).toBe(1);
  });

  it('should add listeners on mount', () => {
    const tree = mount(
      <Sizer
        onSizeChange={onSizeChange}
        containerComponent={Container}
      />,
    );

    const root = tree.find('.container').getDOMNode();

    const callsLength = divProto.addEventListener.mock.calls.length;
    expect(divProto.addEventListener.mock.calls[callsLength - 2])
    .toEqual(['scroll', expect.any(Function)]);
    expect(divProto.addEventListener.mock.calls[callsLength - 1])
    .toEqual(['scroll', expect.any(Function)]);

    expect(divProto.addEventListener.mock.instances[callsLength - 2])
    .toEqual(root.firstChild!.childNodes[0]);
    expect(divProto.addEventListener.mock.instances[callsLength - 1])
    .toEqual(root.firstChild!.childNodes[1]);
  });

  it('should remove listeners on unmount', () => {
    const tree = mount(
      <Sizer
        onSizeChange={onSizeChange}
        containerComponent={Container}
      />,
    );

    const root = tree.find('.container').getDOMNode();
    tree.unmount();

    expect(divProto.removeEventListener.mock.calls).toEqual([
      ['scroll', expect.any(Function)],
      ['scroll', expect.any(Function)],
    ]);
    expect(divProto.removeEventListener.mock.instances).toEqual([
      root.firstChild!.childNodes[0],
      root.firstChild!.childNodes[1],
    ]);
  });

  it('should set a 2px scroll offset to notifiers', () => {
    const tree = mount(
      <Sizer
        onSizeChange={onSizeChange}
        containerComponent={Container}
      />,
    );

    const root = tree.find('.container').getDOMNode();

    const expandTrigger = root.firstChild!.childNodes[0] as Element;
    expect(expandTrigger.scrollTop).toBe(2);
    expect(expandTrigger.scrollLeft).toBe(2);

    const expandNotifier = expandTrigger.firstChild as HTMLElement;
    expect(expandNotifier.style.width).toBe('2px');
    expect(expandNotifier.style.height).toBe('2px');
  });

  it('should call onSizeChange on mount', () => {
    const tree = mount(
      <Sizer
        onSizeChange={onSizeChange}
        containerComponent={Container}
      />,
    );
    const instance = tree.instance() as any;
    instance.getSize = jest.fn().mockReturnValue({ width: 20, height: 10 });
    instance.componentDidMount();

    expect(onSizeChange).toBeCalledWith({ width: 20, height: 10 });
  });

  it('should update scroll offsets to rootNode', () => {
    const tree = mount(
      <Sizer
        onSizeChange={onSizeChange}
        containerComponent={Container}
        scrollTop={35}
        scrollLeft={45}
      />,
    );
    const instance = tree.instance() as any;
    instance.componentDidUpdate();

    expect(instance.rootRef.current.scrollTop).toBe(35);
    expect(instance.rootRef.current.scrollLeft).toBe(45);
  });

  // T1096930
  it('should update scroll offsets to notifiers', () => {
    const resetOffsets = () => {
      // after column reordering scroll offsets are resets
      (root.firstChild!.childNodes[0] as any).scrollTop = 0;
      (root.firstChild!.childNodes[0] as any).scrollLeft = 0;
      (root.firstChild!.childNodes[1] as any).scrollTop = 0;
      (root.firstChild!.childNodes[1] as any).scrollLeft = 0;
    };
    const tree = mount(
      <Sizer
        onSizeChange={onSizeChange}
        containerComponent={Container}
      />,
    );
    const instance = tree.instance() as any;

    const root = tree.find('.container').getDOMNode();
    resetOffsets();
    instance.getSize = jest.fn().mockReturnValue({ width: 20, height: 10 });
    instance.componentDidUpdate();

    expect((root.firstChild!.childNodes[0] as any).scrollTop).toBe(2);
    expect((root.firstChild!.childNodes[0] as any).scrollLeft).toBe(2);

    expect((root.firstChild!.childNodes[1] as any).scrollTop).toBe(10);
    expect((root.firstChild!.childNodes[1] as any).scrollLeft).toBe(20);

    resetOffsets();
    instance.getSize = jest.fn().mockReturnValue({ width: 30, height: 20 });
    instance.componentDidUpdate();

    expect((root.firstChild!.childNodes[0] as any).scrollTop).toBe(2);
    expect((root.firstChild!.childNodes[0] as any).scrollLeft).toBe(2);

    expect((root.firstChild!.childNodes[1] as any).scrollTop).toBe(20);
    expect((root.firstChild!.childNodes[1] as any).scrollLeft).toBe(30);
  });
});
