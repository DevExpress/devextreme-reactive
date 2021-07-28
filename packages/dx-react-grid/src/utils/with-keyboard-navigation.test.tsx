import * as React from 'react';
import { mount } from 'enzyme';
import { withKeyboardNavigation } from './with-keyboard-navigation';

describe('#withKeyboardNavigation', () => {
  const defaultProps = {
    tableRow: { key: 'table-row' } as any,
    tableColumn: { key: 'table-column' } as any,
  };
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render component', () => {
    const BaseComponent = () => null;
    const TestComponent = withKeyboardNavigation()(BaseComponent);
    const tree = mount(<TestComponent {...defaultProps} />);

    expect(tree.find(BaseComponent).props()).toEqual({
      tableRow: defaultProps.tableRow,
      tableColumn: defaultProps.tableColumn,
      refObject: { current: null },
    });
  });

  it('should call updateRefForKeyboardNavigation method', () => {
    const BaseComponent = () => null;
    const TestComponent = withKeyboardNavigation()(BaseComponent);
    const updateRefForKeyboardNavigation = jest.fn();
    mount(<TestComponent
      {...defaultProps}
      updateRefForKeyboardNavigation={updateRefForKeyboardNavigation}
    />);

    expect(updateRefForKeyboardNavigation).toBeCalledWith({
      ref: { current: null },
      key1: defaultProps.tableRow.key,
      key2: defaultProps.tableColumn.key,
      action: 'add',
    });
  });

  it('should call updateRefForKeyboardNavigation method with specific keys', () => {
    const BaseComponent = () => null;
    const TestComponent = withKeyboardNavigation('specific_key1', 'specific_key2')(BaseComponent);
    const updateRefForKeyboardNavigation = jest.fn();
    mount(<TestComponent
      {...defaultProps}
      updateRefForKeyboardNavigation={updateRefForKeyboardNavigation}
    />);

    expect(updateRefForKeyboardNavigation).toBeCalledWith({
      ref: { current: null },
      key1: 'specific_key1',
      key2: 'specific_key2',
      action: 'add',
    });
  });

  it('should call updateRefForKeyboardNavigation on unmount', () => {
    const BaseComponent = () => null;
    const TestComponent = withKeyboardNavigation()(BaseComponent);
    const updateRefForKeyboardNavigation = jest.fn();
    const tree = mount(<TestComponent
      {...defaultProps}
      updateRefForKeyboardNavigation={updateRefForKeyboardNavigation}
    />);
    tree.unmount();

    expect(updateRefForKeyboardNavigation).toBeCalledWith({
      ref: { current: null },
      key1: defaultProps.tableRow.key,
      key2: defaultProps.tableColumn.key,
      action: 'remove',
    });
  });
});
