import * as React from 'react';
import { mount } from 'enzyme';
import { UpdatableSizer } from './updatable-sizer';

describe('UpdatableSizer', () => {
  const ContainerComponent = ({ forwardedRef }) => (
    <div ref={forwardedRef} className="container" />
  );

  it('should render original Sizer', () => {
    const onSizeChange = () => 0;
    const tree = mount(
      <UpdatableSizer
        containerComponent={ContainerComponent}
        onSizeChange={onSizeChange}
      />,
    );

    expect(tree.find('Sizer').props()).toEqual({
      onSizeChange,
      containerComponent: ContainerComponent,
    });
  });

  it('should recalculate size on update', () => {
    const onSizeChange = jest.fn();
    const tree = mount(
      <UpdatableSizer
        containerComponent={ContainerComponent}
        onSizeChange={onSizeChange}
      />,
    );
    onSizeChange.mockClear();

    tree.setProps({ test: 'tag' }); // force update

    expect(onSizeChange).toBeCalled();
  });
});
