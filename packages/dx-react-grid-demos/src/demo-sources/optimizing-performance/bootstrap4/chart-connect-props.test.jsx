import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import Demo from './chart-connect-props';

setupConsole();

Element.prototype.getBBox = () => {};
jest.spyOn(Element.prototype, 'getBBox').mockImplementation(() => ({
  x: 0,
  y: 0,
  width: 800,
  height: 600,
}));

jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(() => ({
  top: 0,
  left: 0,
  width: 800,
  height: 600,
  right: 800,
  bottom: 600,
}));

window.fetch = jest.fn().mockImplementation(() => new Promise(() => {}));
window.getComputedStyle = jest.fn().mockImplementation(() => ({}));
// eslint-disable-next-line
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

it('should not fail', () => {
  expect(() => { mount(<Demo />); })
    .not.toThrow();
});
