import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost, Template } from '@devexpress/dx-react-core';
import { rowIdGetter, cellValueGetter } from '@devexpress/dx-grid-core';
import { GridCore } from './grid-core';
import { pluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  rowIdGetter: jest.fn(),
  cellValueGetter: jest.fn(),
}));

const defaultProps = {
  rows: [{ a: 1 }],
  columns: [{ name: 'a' }],
  rootTemplate: () => null,
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

  it('should render root template', () => {
    const tree = mount(
      <PluginHost>
        <GridCore
          {...defaultProps}
          rootTemplate={({ headerTemplate, bodyTemplate, footerTemplate }) => (
            <div className="root">
              <div className="header">
                {headerTemplate()}
              </div>
              <div className="body">
                {bodyTemplate()}
              </div>
              <div className="footer">
                {footerTemplate()}
              </div>
            </div>
          )}
        />
        <Template name="header"><div className="header-content" /></Template>
        <Template name="body"><div className="body-content" /></Template>
        <Template name="footer"><div className="footer-content" /></Template>
      </PluginHost>,
    );

    const root = tree.find('.root');
    expect(root.exists()).toBeTruthy();
    expect(root.find('.header').find('.header-content').exists()).toBeTruthy();
    expect(root.find('.body').find('.body-content').exists()).toBeTruthy();
    expect(root.find('.footer').find('.footer-content').exists()).toBeTruthy();
  });

  it('should render header placeholder', () => {
    const tree = mount(
      <PluginHost>
        <GridCore
          {...defaultProps}
          rootTemplate={({ headerTemplate, bodyTemplate, footerTemplate }) => (
            <div>
              {headerTemplate()}
              {bodyTemplate()}
              {footerTemplate()}
            </div>
          )}
          headerPlaceholderTemplate={({ children }) =>
            <div className="header-placeholder">{children}</div>}
        />
        <Template name="header"><div className="header-content" /></Template>
      </PluginHost>,
    );

    expect(tree.find('.header-placeholder').find('.header-content').exists()).toBeTruthy();
  });

  it('should render header placeholder with null children if there are no header elements', () => {
    const tree = mount(
      <PluginHost>
        <GridCore
          {...defaultProps}
          rootTemplate={({ headerTemplate, bodyTemplate, footerTemplate }) => (
            <div>
              {headerTemplate()}
              {bodyTemplate()}
              {footerTemplate()}
            </div>
          )}
          headerPlaceholderTemplate={({ children }) =>
            children && <div className="header-placeholder">{children}</div>}
        />
      </PluginHost>,
    );

    expect(!tree.find('.header-placeholder').exists()).toBeTruthy();
  });

  it('should render footer placeholder', () => {
    const tree = mount(
      <PluginHost>
        <GridCore
          {...defaultProps}
          rootTemplate={({ headerTemplate, bodyTemplate, footerTemplate }) => (
            <div>
              {headerTemplate()}
              {bodyTemplate()}
              {footerTemplate()}
            </div>
          )}
          footerPlaceholderTemplate={({ children }) =>
            <div className="footer-placeholder">{children}</div>}
        />
        <Template name="footer"><div className="footer-content" /></Template>
      </PluginHost>,
    );

    expect(tree.find('.footer-placeholder').find('.footer-content').exists()).toBeTruthy();
  });

  it('should render footer placeholder with null children if there are no footer elements', () => {
    const tree = mount(
      <PluginHost>
        <GridCore
          {...defaultProps}
          rootTemplate={({ headerTemplate, bodyTemplate, footerTemplate }) => (
            <div>
              {headerTemplate()}
              {bodyTemplate()}
              {footerTemplate()}
            </div>
          )}
          footerPlaceholderTemplate={({ children }) =>
            children && <div className="footer-placeholder">{children}</div>}
        />
      </PluginHost>,
    );

    expect(!tree.find('.footer-placeholder').exists()).toBeTruthy();
  });

  it('should provide rows', () => {
    const tree = mount(
      <PluginHost>
        <GridCore
          {...defaultProps}
        />
        {pluginDepsToComponents({})}
      </PluginHost>,
    );

    expect(getComputedState(tree).getters.rows)
      .toBe(defaultProps.rows);
  });

  it('should provide getRowId', () => {
    const getRowId = () => {};

    const tree = mount(
      <PluginHost>
        <GridCore
          {...defaultProps}
          getRowId={getRowId}
        />
        {pluginDepsToComponents({})}
      </PluginHost>,
    );

    expect(rowIdGetter)
      .toBeCalledWith(getRowId, defaultProps.rows);
    expect(getComputedState(tree).getters.getRowId)
      .toBe(rowIdGetter());
  });

  it('should provide getCellValue', () => {
    const getCellValue = () => {};

    const tree = mount(
      <PluginHost>
        <GridCore
          {...defaultProps}
          getCellValue={getCellValue}
        />
        {pluginDepsToComponents({})}
      </PluginHost>,
    );

    expect(cellValueGetter)
      .toBeCalledWith(getCellValue, defaultProps.columns);
    expect(getComputedState(tree).getters.getCellValue)
      .toEqual(cellValueGetter());
  });
});
