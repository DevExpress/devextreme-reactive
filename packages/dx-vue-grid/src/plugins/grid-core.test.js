import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost, Template } from '@devexpress/dx-vue-core';
import { rowIdGetter, cellValueGetter } from '@devexpress/dx-grid-core';
import { GridCore } from './grid-core';
import { PluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  rowIdGetter: jest.fn(),
  cellValueGetter: jest.fn(),
}));

const defaultProps = {
  rows: [{ a: 1 }],
  columns: [{ name: 'a' }],
  rootComponent: { render() { return null; } },
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
    const tree = mount({
      render() {
        return (
          <PluginHost>
            <GridCore
              {...{ attrs: { ...defaultProps } }}
              rootComponent={{
                render() {
                  return (
                    <div class="root">
                      {this.$slots.default}
                    </div>
                  );
                },
              }}
            />
            <Template name="header"><div class="header-content" /></Template>
            <Template name="body"><div class="body-content" /></Template>
            <Template name="footer"><div class="footer-content" /></Template>
          </PluginHost>
        );
      },
    });

    const root = tree.find('.root');
    expect(root.exists()).toBeTruthy();
    expect(root.find('.header-content').exists()).toBeTruthy();
    expect(root.find('.body-content').exists()).toBeTruthy();
    expect(root.find('.footer-content').exists()).toBeTruthy();
  });

  it('should provide rows', () => {
    const tree = mount({
      render() {
        return (
          <PluginHost>
            <GridCore
              {...{ attrs: { ...defaultProps } }}
            />
            <PluginDepsToComponents deps={{}} />
          </PluginHost>
        );
      },
    });

    expect(getComputedState(tree).rows)
      .toBe(defaultProps.rows);
  });

  it('should provide getRowId', () => {
    const getRowId = () => {};

    const tree = mount({
      render() {
        return (
          <PluginHost>
            <GridCore
              {...{ attrs: { ...defaultProps } }}
              getRowId={getRowId}
            />
            <PluginDepsToComponents deps={{}} />
          </PluginHost>
        );
      },
    });

    expect(rowIdGetter)
      .toBeCalledWith(getRowId, defaultProps.rows);
    expect(getComputedState(tree).getRowId)
      .toBe(rowIdGetter());
  });

  it('should provide getCellValue', () => {
    const getCellValue = () => {};

    const tree = mount({
      render() {
        return (
          <PluginHost>
            <GridCore
              {...{ attrs: { ...defaultProps } }}
              getCellValue={getCellValue}
            />
            <PluginDepsToComponents deps={{}} />
          </PluginHost>
        );
      },
    });

    expect(cellValueGetter)
      .toBeCalledWith(getCellValue, defaultProps.columns);
    expect(getComputedState(tree).getCellValue)
      .toEqual(cellValueGetter());
  });
});
