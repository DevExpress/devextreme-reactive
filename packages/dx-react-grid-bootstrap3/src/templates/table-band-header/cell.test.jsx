/* globals window:true */

import * as React from 'react';
import { shallow } from 'enzyme';
import { Cell } from './cell';

jest.mock('react-dom', () => ({
  findDOMNode: jest.fn(() => null),
}));

describe('TableCell', () => {
  const { getComputedStyle } = window;
  beforeEach(() => {
    window.getComputedStyle = jest.fn().mockImplementation(() => ({}));
  });
  afterEach(() => {
    window.getComputedStyle = getComputedStyle;
  });

  it('should render children if passed', () => {
    const tree = shallow((
      <Cell>
        <span className="test" />
      </Cell>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <Cell className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should pass styles to the root element', () => {
    const tree = shallow((
      <Cell style={{ color: 'red' }} />
    ));

    expect(tree.find('th').prop('style').color)
      .toBe('red');
    expect(tree.find('th').prop('style').borderTop)
      .toBe('none');
  });
});
