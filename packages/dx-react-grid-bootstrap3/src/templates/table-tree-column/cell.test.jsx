import * as React from 'react';
import { shallow } from 'enzyme';
import { Cell } from './cell';

describe('Cell', () => {
  it('should have correct text', () => {
    const tree = shallow(<Cell value="text" />);
    expect(tree.text()).toBe('text');
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

  it('should pass style to the root element', () => {
    const tree = shallow((
      <Cell
        style={{ color: 'gray' }}
      />
    ));

    expect(tree.prop('style'))
      .toMatchObject({ color: 'gray' });
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <Cell className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });
});
