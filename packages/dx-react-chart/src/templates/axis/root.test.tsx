import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { Root } from './root';

describe('Root', () => {
  let resetConsole;
  const getBBox = jest.fn();

  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['The tag <%s> is unrecognized in this browser.'] });
    (global as any).HTMLUnknownElement.prototype.getBBox = getBBox;
  });

  afterAll(() => {
    delete (global as any).HTMLUnknownElement.prototype.getBBox;
    resetConsole();
  });

  afterEach(getBBox.mockReset);

  it('should render root element, horizontal top', () => {
    getBBox.mockReturnValue({
      x: 8, y: -37, width: 40, height: 30,
    });
    const mock = jest.fn();
    const tree = mount((
      <Root dx={1} dy={0} onSizeChange={mock}>
        <div />
      </Root>
    ));

    const g = tree.find('g');
    expect(g.props().transform).toEqual('translate(0 37)');
    expect(g.find('div').exists()).toBeTruthy();
    expect(mock).toBeCalledWith({ width: 40, height: 37 });
  });

  it('should render root element, horizontal top', () => {
    getBBox.mockReturnValue({
      x: 8, y: 7, width: 40, height: 30,
    });
    const mock = jest.fn();
    const tree = mount((
      <Root dx={1} dy={0} onSizeChange={mock}>
        <div />
      </Root>
    ));

    const g = tree.find('g');
    expect(g.props().transform).toEqual('translate(0 0)');
    expect(g.find('div').exists()).toBeTruthy();
    expect(mock).toBeCalledWith({ width: 40, height: 37 });
  });

  it('should render root element, vertical left', () => {
    getBBox.mockReturnValue({
      x: -48, y: 7, width: 40, height: 30,
    });
    const mock = jest.fn();
    const tree = mount((
      <Root dx={0} dy={1} onSizeChange={mock}>
        <div />
      </Root>
    ));

    const g = tree.find('g');
    expect(g.props().transform).toEqual('translate(48 0)');
    expect(g.find('div').exists()).toBeTruthy();
    expect(mock).toBeCalledWith({ width: 48, height: 30 });
  });

  it('should render root element, vertical right', () => {
    getBBox.mockReturnValue({
      x: 8, y: 7, width: 40, height: 30,
    });
    const mock = jest.fn();
    const tree = mount((
      <Root dx={0} dy={1} onSizeChange={mock}>
        <div />
      </Root>
    ));

    const g = tree.find('g');
    expect(g.props().transform).toEqual('translate(0 0)');
    expect(g.find('div').exists()).toBeTruthy();
    expect(mock).toBeCalledWith({ width: 48, height: 30 });
  });

  it('should pass rest properties to the root element', () => {
    getBBox.mockReturnValue({});
    const tree = mount((
      <Root dx={1} dy={0} onSizeChange={() => null} custom={10}>
        <div />
      </Root>
    ));

    const { custom } = tree.find('g').props() as any;
    expect(custom).toEqual(10);
  });
});
