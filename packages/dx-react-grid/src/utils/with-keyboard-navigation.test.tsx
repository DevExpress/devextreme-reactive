import * as React from 'react';
import { mount } from 'enzyme';
import { withKeyboardNavigation } from './with-keyboard-navigation';

describe('#withKeyboardNavigation', () => {
  const defaultProps = {
    tableRow: { key: 'table-row' } as any,
    tableColumn: { key: 'table-column' } as any,
    updateRefForKeyboardNavigation: jest.fn(),
    setFocusedElement: jest.fn(),
  };
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render component', () => {
    const BaseComponent = () => null;
    const TestComponent = withKeyboardNavigation()(BaseComponent);
    const tree = mount(<TestComponent {...defaultProps as any} />);

    expect(tree.find(BaseComponent).props()).toEqual({
      tableRow: defaultProps.tableRow,
      tableColumn: defaultProps.tableColumn,
      refObject: { current: null },
    });
  });

  it('should call updateRefForKeyboardNavigation method', () => {
    const BaseComponent = () => null;
    const TestComponent = withKeyboardNavigation()(BaseComponent);
    const ref = {
      current: {
        addEventListener: jest.fn(), removeEventListener: jest.fn(),
      },
    };

    const tree = mount(<TestComponent
      {...defaultProps as any}
    />);
    (tree.instance() as any).ref = ref;
    tree.instance().componentDidMount();

    expect(defaultProps.updateRefForKeyboardNavigation).toBeCalledWith({
      ref,
      key1: defaultProps.tableRow.key,
      key2: defaultProps.tableColumn.key,
      action: 'add',
    });
    expect(ref.current.addEventListener).toBeCalledWith('mouseup', expect.any(Function));
  });

  it('should not rise errors, updateRefForKeyboardNavigation is not defined', () => {
    const BaseComponent = () => null;
    const TestComponent = withKeyboardNavigation()(BaseComponent);
    const ref = {
      current: {
        addEventListener: jest.fn(), removeEventListener: jest.fn(),
      },
    };
    const props = {
      tableRow: { key: 'table-row' } as any,
      tableColumn: { key: 'table-column' } as any,
    };

    const tree = mount(<TestComponent
      {...props as any}
    />);
    (tree.instance() as any).ref = ref;
    tree.instance().componentDidMount();

    expect(tree.find(BaseComponent)).toBeTruthy();
  });

  it('should call updateRefForKeyboardNavigation method with specific keys', () => {
    const BaseComponent = () => null;
    const TestComponent = withKeyboardNavigation('specific_key1', 'specific_key2')(BaseComponent);
    const ref = {
      current: {
        addEventListener: jest.fn(), removeEventListener: jest.fn(),
      },
    };
    const tree = mount(<TestComponent
      {...defaultProps as any}
    />);
    (tree.instance() as any).ref = ref;
    tree.instance().componentDidMount();

    expect(defaultProps.updateRefForKeyboardNavigation).toBeCalledWith({
      ref,
      key1: 'specific_key1',
      key2: 'specific_key2',
      action: 'add',
    });
  });

  it('should call updateRefForKeyboardNavigation on unmount', () => {
    const BaseComponent = () => null;
    const TestComponent = withKeyboardNavigation()(BaseComponent);
    const ref = {
      current: {
        addEventListener: jest.fn(), removeEventListener: jest.fn(),
      },
    };
    const tree = mount(<TestComponent
      {...defaultProps as any}
    />);
    (tree.instance() as any).ref = ref;
    tree.unmount();

    expect(defaultProps.updateRefForKeyboardNavigation).toBeCalledWith({
      ref,
      key1: defaultProps.tableRow.key,
      key2: defaultProps.tableColumn.key,
      action: 'remove',
    });
    expect(ref.current.removeEventListener).toBeCalledWith('mouseup', expect.any(Function));
  });

  it('should call setFocusedElement on click', () => {
    const BaseComponent = () => null;
    const TestComponent = withKeyboardNavigation()(BaseComponent);

    const tree = mount(<TestComponent
      {...defaultProps as any}
    />);
    (tree.instance() as any).handleClick({});

    expect(defaultProps.setFocusedElement).toBeCalledWith({
      key1: 'table-row', key2: 'table-column', event: {},
    });
  });

  it('should call setFocusedElement on click with specific keys', () => {
    const BaseComponent = () => null;
    const TestComponent = withKeyboardNavigation('specific_key1', 'specific_key2')(BaseComponent);

    const tree = mount(<TestComponent
      {...defaultProps as any}
    />);
    (tree.instance() as any).handleClick({});
    expect(defaultProps.setFocusedElement).toBeCalledWith({
      key1: 'specific_key1', key2: 'specific_key2', event: {},
    });
  });
});
