import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { Cell } from './cell';

describe('TableGroupCell', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  const defaultProps = {
    contentComponent: () => null,
    iconComponent: () => null,
    containerComponent: ({ children }) => children,
    row: {},
    column: {},
    onToggle: jest.fn(),
    expanded: true,
    position: '13px',
    side: 'left',
  };

  it('should render children inside content component if passed', () => {
    const tree = shallow((
      <Cell
        {...defaultProps}
        contentComponent={({ children }) => children}
      >
        <span className="test" />
      </Cell>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should render Icon', () => {
    const tree = mount((
      <Cell {...defaultProps} />
    ));

    expect(tree.find(defaultProps.iconComponent).props())
      .toMatchObject({
        expanded: defaultProps.expanded,
        onToggle: defaultProps.onToggle,
        className: 'mr-2',
      });
  });

  it('should render Content', () => {
    const tree = mount((
      <Cell {...defaultProps} />
    ));

    expect(tree.find(defaultProps.contentComponent).props())
      .toMatchObject({
        column: defaultProps.column,
        row: defaultProps.row,
      });
  });

  it('should render Container', () => {
    const tree = mount((
      <Cell {...defaultProps} />
    ));

    expect(tree.find(defaultProps.containerComponent).props())
      .toMatchObject({
        position: '13px',
        side: 'left',
      });
  });

  it('should pass custom class to the root element', () => {
    const tree = shallow((
      <Cell
        {...defaultProps}
        className="custom-class"
      />
    ));

    expect(tree.is('.dx-g-bs4-cursor-pointer.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <Cell
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.prop('data'))
      .toEqual({ a: 1 });
  });
});
