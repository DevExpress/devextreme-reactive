/* globals window:true */

import * as React from 'react';
import { mount } from 'enzyme';
import { Root } from './layout';

jest.mock('react-dom', () => ({
  findDOMNode: jest.fn(() => null),
}));

describe('Layout', () => {
  const { getComputedStyle } = window;
  beforeEach(() => {
    window.getComputedStyle = jest.fn().mockImplementation(() => ({}));
  });
  afterEach(() => {
    window.getComputedStyle = getComputedStyle;
  });

  describe('Root', () => {
    it('should pass className to the root element', () => {
      const tree = mount((
        <Root className="custom-class" />
      ));

      expect(tree.find('.panel.panel-default.custom-class').exists())
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = mount((
        <Root data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });
});
