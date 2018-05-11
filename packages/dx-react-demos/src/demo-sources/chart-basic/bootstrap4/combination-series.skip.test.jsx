import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import Demo from './combination-series.skip';

setupConsole();

jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(() => ({
  top: 0,
  left: 0,
  width: 800,
  height: 600,
  right: 800,
  bottom: 600,
}));

Element.prototype.getBBox = () => {};
jest.spyOn(Element.prototype, 'getBBox').mockImplementation(() => ({
  x: 0,
  y: 0,
  width: 800,
  height: 600,
}));

window.fetch = jest.fn().mockImplementation(() => new Promise(() => {}));

it('should not fail', () => {
  expect(() => { mount(<Demo />); })
    .not.toThrow();
});
