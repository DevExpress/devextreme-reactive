import * as React from 'react';
import { mount } from 'enzyme';
import { Sizer } from './sizer';

describe('Sizer', () => {
  const divProto = (document.createElement('div') as HTMLDivElement).constructor.prototype;
  let addEventListener: any;
  let removeEventListener: any;
  const Container = () => <div className="container" />;

  beforeAll(() => {
    addEventListener = divProto.addEventListener;
    removeEventListener = divProto.removeEventListener;
    divProto.addEventListener = jest.fn().mockImplementation();
    divProto.removeEventListener = jest.fn();
  });

  afterAll(() => {
    divProto.addEventListener = addEventListener;
    divProto.removeEventListener = removeEventListener;
  });

  afterEach(() => {
    divProto.addEventListener.mockClear();
    divProto.removeEventListener.mockClear();
  });

  it.skip('should add listeners on mount', () => {
    const tree = mount(
      <Sizer
        onSizeChange={() => void 0}
        containerComponent={Container}
      />,
    );

    const root = tree.find('.container').getDOMNode();
    expect(divProto.addEventListener.mock.calls).toEqual([
      ['scroll', expect.any(Function)],
      ['scroll', expect.any(Function)],
    ]);
    expect(divProto.addEventListener.mock.instances).toEqual([
      root.firstChild!.childNodes[0],
      root.firstChild!.childNodes[1],
    ]);
  });

  it('should remove listeners on unmount', () => {
    const tree = mount(
      <Sizer
        onSizeChange={() => void 0}
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
        onSizeChange={() => void 0}
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
});
