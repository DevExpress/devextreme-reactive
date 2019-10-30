import * as React from 'react';
import { shallow } from 'enzyme';
import { Cell } from './cell';

describe('GroupRowCell', () => {
  it('should assign onClick handler', () => {
    const onToggle = jest.fn();
    const tree = shallow(<Cell onToggle={onToggle} />);
    const onClick = tree.prop('onClick');

    onClick();

    expect(onToggle)
      .toBeCalled();
  });

  it('should render children', () => {
    const tree = shallow((
      <Cell>
        <span className="test" />
      </Cell>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should pass custom style to the root element', () => {
    const tree = shallow((
      <Cell
        style={{ background: 'red' }}
      />
    ));

    expect(tree.prop('style'))
      .toMatchObject({
        background: 'red',
        cursor: 'pointer',
      });
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <Cell data={{ a: 1 }} />
    ));

    expect(tree.prop('data'))
      .toEqual({
        a: 1,
      });
  });
});
