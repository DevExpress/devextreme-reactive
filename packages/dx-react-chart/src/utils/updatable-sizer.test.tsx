import * as React from 'react';
import { mount } from 'enzyme';
import { UpdatableSizer } from './updatable-sizer';

describe('UpdatableSizer', () => {
  it('should render original Sizer', () => {
    const containerComponent = 'div';
    const onSizeChange = () => 0;
    const tree = mount(
      <UpdatableSizer
        containerComponent={containerComponent}
        onSizeChange={onSizeChange}
      />,
    );

    expect(tree.find('Sizer').props()).toEqual({
      onSizeChange,
      containerComponent: 'div',
    });
  });

  it('should recalculate size on update', () => {
    const containerComponent = 'div';
    const onSizeChange = jest.fn();
    const tree = mount(
      <UpdatableSizer
        containerComponent={containerComponent}
        onSizeChange={onSizeChange}
      />,
    );
    onSizeChange.mockClear();

    tree.setProps({ test: 'tag' }); // force update

    expect(onSizeChange).toBeCalled();
  });
});
