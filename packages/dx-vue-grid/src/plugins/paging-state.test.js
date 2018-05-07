import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { DxPluginHost } from '@devexpress/dx-vue-core';
import { setCurrentPage, setPageSize } from '@devexpress/dx-grid-core';
import { PluginDepsToComponents, getComputedState, executeComputedAction } from './test-utils';
import { DxPagingState } from './paging-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  setCurrentPage: jest.fn(),
  setPageSize: jest.fn(),
}));

describe('DxPagingState', () => {
  const defaultProps = {
    currentPage: 0,
  };
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    setPageSize.mockImplementation(() => {});
    setCurrentPage.mockImplementation(() => {});
  });

  it('should provide currentPage getter', () => {
    const defaultCurrentPage = 10;
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={{}} />
            <DxPagingState
              {...{ attrs: { ...defaultProps } }}
              currentPage={defaultCurrentPage}
            />
          </DxPluginHost>
        );
      },
    });

    expect(getComputedState(tree).currentPage)
      .toBe(defaultCurrentPage);
  });

  it('should provide pageSize getter', () => {
    const defaultPageSize = 12;
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={{}} />
            <DxPagingState
              {...{ attrs: { ...defaultProps } }}
              pageSize={defaultPageSize}
            />
          </DxPluginHost>
        );
      },
    });
    expect(getComputedState(tree).pageSize)
      .toBe(defaultPageSize);
  });

  it('should call setCurrentPage action', () => {
    const changeCurrentPageValue = 12;
    const defaultCurrentPage = 3;
    setCurrentPage.mockImplementation(() => changeCurrentPageValue);
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={{}} />
            <DxPagingState
              {...{ attrs: { ...defaultProps } }}
              currentPage={defaultCurrentPage}
            />
          </DxPluginHost>
        );
      },
    });

    executeComputedAction(tree, (actions) => {
      actions.setCurrentPage(changeCurrentPageValue);
    });
    expect(tree.find(DxPagingState).emitted()['update:currentPage'][0][0]).toBe(changeCurrentPageValue);

    expect(setCurrentPage.mock.calls[0][0])
      .toEqual(defaultCurrentPage);
    expect(setCurrentPage.mock.calls[0][1])
      .toEqual(changeCurrentPageValue);
  });

  it('should call setPageSize action', () => {
    const changePageSizeValue = 12;
    const defaultPageSize = 3;
    setPageSize.mockImplementation(() => changePageSizeValue);
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={{}} />
            <DxPagingState
              {...{ attrs: { ...defaultProps } }}
              pageSize={defaultPageSize}
            />
          </DxPluginHost>
        );
      },
    });

    executeComputedAction(tree, (actions) => {
      actions.setPageSize(changePageSizeValue);
    });
    expect(tree.find(DxPagingState).emitted()['update:pageSize'][0][0]).toBe(changePageSizeValue);

    expect(setPageSize.mock.calls[0][0])
      .toEqual(defaultPageSize);
    expect(setPageSize.mock.calls[0][1])
      .toEqual(changePageSizeValue);
  });
});
