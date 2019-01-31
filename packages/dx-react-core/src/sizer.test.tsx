import * as React from 'react';
import { mount } from 'enzyme';
import { Sizer } from './sizer';

describe('Sizer', () => {
  const divProto = (document.createElement('div') as HTMLDivElement).constructor.prototype;
  let addEventListener: any;
  let removeEventListener: any;

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
  });

  it('should add listeners on mount', () => {
    const Container = () => <div className="container" />;
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
    const Container = () => <div className="container" />;
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
});
