import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState, setupConsole } from '@devexpress/dx-testing';
import { PluginHost, Template } from '@devexpress/dx-react-core';
import { rowIdGetter, cellValueGetter } from '@devexpress/dx-grid-core';
import { GridCore } from './grid-core';

jest.mock('@devexpress/dx-grid-core', () => ({
  rowIdGetter: jest.fn(),
  cellValueGetter: jest.fn(),
}));

const defaultProps = {
  rows: [{ a: 1 }],
  columns: [{ name: 'a' }],
  rootComponent: () => null,
};

describe('Grid', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    rowIdGetter.mockImplementation(() => 0);
    cellValueGetter.mockImplementation(() => 0);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render root component', () => {
    const Root = ({ children }) => (
      <div className="root">
        {children}
      </div>
    );

    const tree = mount((
      <PluginHost>
        <GridCore
          {...defaultProps}
          rootComponent={Root}
        />
        <Template name="header">
          <div className="header-content" />
        </Template>
        <Template name="body">
          <div className="body-content" />
        </Template>
        <Template name="footer">
          <div className="footer-content" />
        </Template>
      </PluginHost>
    ));

    const root = tree.find('.root');
    expect(root.exists()).toBeTruthy();
    expect(root.children().at(0).find('.header-content').exists()).toBeTruthy();
    expect(root.children().at(1).find('.body-content').exists()).toBeTruthy();
    expect(root.children().at(2).find('.footer-content').exists()).toBeTruthy();
  });

  it('should provide rows', () => {
    const tree = mount((
      <PluginHost>
        <GridCore
          {...defaultProps}
        />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));

    expect(getComputedState(tree).rows)
      .toBe(defaultProps.rows);
  });

  it('should provide getRowId', () => {
    const getRowId = () => '';

    const tree = mount((
      <PluginHost>
        <GridCore
          {...defaultProps}
          getRowId={getRowId}
        />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));

    expect(rowIdGetter)
      .toBeCalledWith(getRowId, defaultProps.rows);
    expect(getComputedState(tree).getRowId)
      .toBe(rowIdGetter());
  });

  it('should provide getCellValue', () => {
    const getCellValue = () => {};

    const tree = mount((
      <PluginHost>
        <GridCore
          {...defaultProps}
          getCellValue={getCellValue}
        />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));

    expect(cellValueGetter)
      .toBeCalledWith(getCellValue, defaultProps.columns);
    expect(getComputedState(tree).getCellValue)
      .toEqual(cellValueGetter());
  });
});
