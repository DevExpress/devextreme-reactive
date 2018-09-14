import { mount } from '@vue/test-utils';
import { pageCount } from '@devexpress/dx-grid-core';
import { DxPluginHost } from '@devexpress/dx-vue-core';
import { DxPagingPanel } from './paging-panel';
import { PluginDepsToComponents } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  pageCount: jest.fn(),
}));

const defaultDeps = {
  getter: {
    currentPage: 1,
    pageSize: 2,
    totalCount: 21,
  },
  action: {
    setCurrentPage: jest.fn(),
    setPageSize: jest.fn(),
  },
  template: {
    footer: { },
  },
  plugins: ['DxPagingState'],
};

const DefaultPager = { name: 'DefaultPager', render() { return null; } };

describe('DxPagingPanel', () => {
  beforeEach(() => {
    pageCount.mockImplementation(() => 11);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render the "containerComponent" in the "footer" template placeholder', () => {
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxPagingPanel
              containerComponent={DefaultPager}
              pageSizes={[3, 5, 0]}
            />
          </DxPluginHost>
        );
      },
    });

    const pager = tree.find(DefaultPager);

    expect(pager.vm.$attrs)
      .toMatchObject({
        currentPage: 1,
        pageSize: 2,
        totalCount: 21,
        totalPages: 11,
        pageSizes: [3, 5, 0],
      });

    pager.vm.$emit('currentPageChange', 3);
    expect(defaultDeps.action.setCurrentPage.mock.calls[0][0])
      .toEqual(3);
  });

  it('should pass correct getMessage prop to containerComponent', () => {
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxPagingPanel
              containerComponent={DefaultPager}
              messages={{
                showAll: 'Show all',
              }}
            />
          </DxPluginHost>
        );
      },
    });

    const pager = tree.find(DefaultPager);
    const { getMessage } = pager.vm.$attrs;

    expect(getMessage('showAll'))
      .toBe('Show all');
  });
});
