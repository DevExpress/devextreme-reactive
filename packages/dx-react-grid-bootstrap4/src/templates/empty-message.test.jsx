import * as React from 'react';
import { shallow } from 'enzyme';
import { EmptyMessage } from './empty-message';

describe('EmptyMessage', () => {
  it('should use "noColumns" message key', () => {
    const tree = shallow((
      <EmptyMessage getMessage={key => key} />
    ));

    expect(tree.find('div big.text-muted').text()).toBe('noColumns');
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <EmptyMessage
        getMessage={key => key}
        className="custom-class"
      />
    ));

    expect(tree.is('.py-5.text-center.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <EmptyMessage
        getMessage={key => key}
        data={{ a: 1 }}
      />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
