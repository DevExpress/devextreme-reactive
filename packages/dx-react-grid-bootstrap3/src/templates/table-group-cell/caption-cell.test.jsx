import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { CaptionCell as Cell } from './caption-cell';

describe('GroupCaptionCell', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  const defaultProps = {
    contentComponent: () => null,
    containerComponent: ({ children }) => children,
    iconComponent: () => null,
    inlineSummaryComponent: () => null,
    inlineSummaryItemComponent: () => null,
    row: {},
    column: {},
    onToggle: jest.fn(),
    getMessage: jest.fn(),
    expanded: true,
    inlineSummaries: [],
  };

  it('should render children inside content component if passed', () => {
    const tree = mount((
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
        style: {
          marginRight: '8px',
        },
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

  it('should render inline summary if exists', () => {
    const inlineSummaries = [{}, {}];
    const tree = mount((
      <Cell {...defaultProps} inlineSummaries={inlineSummaries} />
    ));

    expect(tree.find(defaultProps.inlineSummaryComponent).props())
      .toEqual({
        inlineSummaries,
        getMessage: defaultProps.getMessage,
        inlineSummaryItemComponent: defaultProps.inlineSummaryItemComponent,
      });
  });

  it('should not render inline summary if not exists', () => {
    const tree = mount((
      <Cell {...defaultProps} />
    ));

    expect(tree.find(defaultProps.inlineSummaryComponent).exists())
      .toBeFalsy();
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
