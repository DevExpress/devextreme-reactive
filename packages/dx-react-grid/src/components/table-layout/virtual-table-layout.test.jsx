import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { shallow, mount } from 'enzyme';
import { getCollapsedGrid } from '@devexpress/dx-grid-core';
import { setupConsole } from '@devexpress/dx-testing';
import { VirtualTableLayout } from './virtual-table-layout';

jest.mock('react-dom', () => ({
  findDOMNode: jest.fn(),
}));
jest.mock('@devexpress/dx-grid-core', () => {
  const actual = require.requireActual('@devexpress/dx-grid-core');
  jest.spyOn(actual, 'getCollapsedGrid');
  return actual;
});
jest.mock('./column-group', () => ({
  ColumnGroup: () => null,
}));
jest.mock('@devexpress/dx-react-core', () => {
  const { Component } = require.requireActual('react');
  return {
    // eslint-disable-next-line react/prop-types
    Sizer: ({ containerComponent: Container, children, ...restProps }) => (
      <Container {...restProps}>
        {children({ width: 400, height: 120 })}
      </Container>
    ),
    // eslint-disable-next-line react/prefer-stateless-function
    RefHolder: class extends Component {
      render() {
        // eslint-disable-next-line react/prop-types
        const { children: propsChildren } = this.props;
        return propsChildren;
      }
    },
  };
});

const defaultProps = {
  columns: [
    { key: 'a', column: { name: 'a' } },
    { key: 'b', column: { name: 'b' } },
    { key: 'c', column: { name: 'c' } },
    { key: 'd', column: { name: 'd' } },
    { key: 'e', column: { name: 'e' } },
  ],
  minWidth: 400,
  minColumnWidth: 120,
  height: 100,
  estimatedRowHeight: 40,
  bodyRows: [
    { key: 1 },
    { key: 2 },
    { key: 3 },
    { key: 4 },
    { key: 5 },
    { key: 6 },
    { key: 7 },
    { key: 8 },
    { key: 9 },
  ],
  containerComponent: props => <div {...props} />,
  headTableComponent: props => <table {...props} />,
  tableComponent: props => <table {...props} />,
  headComponent: props => <thead {...props} />,
  bodyComponent: props => <tbody {...props} />,
  rowComponent: () => null,
  cellComponent: () => null,
  getCellColSpan: () => 1,
};

describe('VirtualTableLayout', () => {
  let resetConsole;
  beforeEach(() => {
    resetConsole = setupConsole();
    findDOMNode.mockImplementation(() => ({
      getBoundingClientRect: () => ({
        height: defaultProps.estimatedRowHeight,
      }),
    }));
  });

  afterEach(() => {
    resetConsole();
    jest.clearAllMocks();
  });

  const simulateScroll = (tree, props) => {
    const target = {
      scrollTop: 0,
      scrollLeft: 0,
      ...props,
    };

    const eventData = {
      target,
      currentTarget: target,
    };

    tree
      .find('Sizer')
      .find(defaultProps.containerComponent)
      .prop('onScroll')(eventData);
    tree.update();
  };

  it('should render correct layout', () => {
    const tree = shallow((
      <VirtualTableLayout
        {...defaultProps}
        headerRows={defaultProps.bodyRows.slice(0, 1)}
        footerRows={defaultProps.bodyRows.slice(0, 1)}
      />
    ));

    expect(tree.find('Sizer').dive())
      .toMatchSnapshot();
  });

  describe('viewport', () => {
    it('should pass correct viewport at startup', () => {
      const tree = mount((
        <VirtualTableLayout
          {...defaultProps}
          headerRows={defaultProps.bodyRows.slice(0, 1)}
          footerRows={defaultProps.bodyRows.slice(0, 1)}
        />
      ));

      expect(tree.find(defaultProps.containerComponent).props().style)
        .toMatchObject({ height: `${defaultProps.height}px` });

      expect(getCollapsedGrid.mock.calls[getCollapsedGrid.mock.calls.length - 3][0])
        .toMatchObject({
          top: 0,
          left: 0,
          height: defaultProps.estimatedRowHeight,
          width: 400,
        });
      expect(getCollapsedGrid.mock.calls[getCollapsedGrid.mock.calls.length - 2][0])
        .toMatchObject({
          top: 0,
          left: 0,
          height: 120 - (defaultProps.estimatedRowHeight * 2),
          width: 400,
        });
      expect(getCollapsedGrid.mock.calls[getCollapsedGrid.mock.calls.length - 1][0])
        .toMatchObject({
          top: 0,
          left: 0,
          height: defaultProps.estimatedRowHeight,
          width: 400,
        });
    });

    it('should pass correct viewport at startup when height is auto', () => {
      const tree = mount((
        <VirtualTableLayout
          {...defaultProps}
          headerRows={defaultProps.bodyRows.slice(0, 1)}
          height="auto"
        />
      ));

      expect(tree.find(defaultProps.containerComponent).props().style)
        .not.toMatchObject({ height: `${defaultProps.height}px` });
    });

    it('should pass correct viewport at on viewport change', () => {
      const tree = mount((
        <VirtualTableLayout
          {...defaultProps}
          headerRows={defaultProps.bodyRows.slice(0, 1)}
        />
      ));

      simulateScroll(tree, { scrollTop: 100, scrollLeft: 50 });

      expect(getCollapsedGrid.mock.calls[getCollapsedGrid.mock.calls.length - 3][0])
        .toMatchObject({
          top: 0,
          left: 50,
        });
      expect(getCollapsedGrid.mock.calls[getCollapsedGrid.mock.calls.length - 2][0])
        .toMatchObject({
          top: 100,
          left: 50,
        });
      expect(getCollapsedGrid.mock.calls[getCollapsedGrid.mock.calls.length - 1][0])
        .toMatchObject({
          top: 0,
          left: 50,
        });
    });
  });

  describe('row heights', () => {
    it('should specify correct row height at startup', () => {
      expect.hasAssertions();

      const rows = [
        { key: 1 },
        { key: 2, height: 10 },
      ];

      getCollapsedGrid
        .mockImplementationOnce((args) => {
          const { getRowHeight } = args;
          expect(getRowHeight(rows[0]))
            .toEqual(defaultProps.estimatedRowHeight);
          expect(getRowHeight(rows[1]))
            .toEqual(10);

          return require.requireActual('@devexpress/dx-grid-core').getCollapsedGrid(args);
        });

      mount((
        <VirtualTableLayout
          {...defaultProps}
          bodyRows={rows}
        />
      ));
    });

    it('should store row height when rendered', () => {
      const rows = [
        { key: 1 },
        { key: 2, height: 10 },
      ];

      findDOMNode.mockImplementation(() => ({
        getBoundingClientRect: () => ({
          height: 50,
        }),
      }));

      mount((
        <VirtualTableLayout
          {...defaultProps}
          bodyRows={rows}
        />
      ));

      const { getRowHeight } = getCollapsedGrid.mock.calls[0][0];
      expect(getRowHeight(rows[0]))
        .toEqual(50);
      expect(getRowHeight(rows[1]))
        .toEqual(50);
    });

    it('should clear row height when rows updated', () => {
      const rows = [
        { key: 11 },
        { key: 12 },
      ];

      findDOMNode.mockImplementation(() => ({
        getBoundingClientRect: () => ({
          height: 50,
        }),
      }));

      const tree = mount((
        <VirtualTableLayout
          {...defaultProps}
          bodyRows={rows}
        />
      ));
      tree.setProps({ bodyRows: [rows[0]] });

      const { getRowHeight } = getCollapsedGrid.mock.calls[0][0];
      expect(getRowHeight(rows[1]))
        .toEqual(defaultProps.estimatedRowHeight);
    });

    it('should clear row height when headerRows updated', () => {
      const rows = [
        { key: 11 },
        { key: 12 },
      ];

      findDOMNode.mockImplementation(() => ({
        getBoundingClientRect: () => ({
          height: 50,
        }),
      }));

      const tree = mount((
        <VirtualTableLayout
          {...defaultProps}
          headerRows={rows}
        />
      ));
      tree.setProps({ headerRows: [rows[0]] });

      const { getRowHeight } = getCollapsedGrid.mock.calls[0][0];
      expect(getRowHeight(rows[1]))
        .toEqual(defaultProps.estimatedRowHeight);
    });
  });
});
