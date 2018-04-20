import { mount } from '@vue/test-utils';
import { pageCount, getMessagesFormatter } from '@devexpress/dx-grid-core';
import { PluginHost } from '@devexpress/dx-vue-core';
import { PagingPanel } from './paging-panel';
import { PluginDepsToComponents } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  pageCount: jest.fn(),
  getMessagesFormatter: jest.fn(),
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
  plugins: ['PagingState'],
};

const DefaultPager = { name: 'DefaultPager', render() { return null; } };

describe('PagingPanel', () => {
  beforeEach(() => {
    pageCount.mockImplementation(() => 11);
    getMessagesFormatter.mockImplementation(messages => key => (messages[key] || key));
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render the "containerComponent" in the "footer" template placeholder', () => {
    const tree = mount({
      render() {
        return (
          <PluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <PagingPanel
              containerComponent={DefaultPager}
              pageSizes={[3, 5, 0]}
            />
          </PluginHost>
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
          <PluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <PagingPanel
              containerComponent={DefaultPager}
              messages={{
                showAll: 'Show all',
              }}
            />
          </PluginHost>
        );
      },
    });

    const pager = tree.find(DefaultPager);
    const { getMessage } = pager.vm.$attrs;

    expect(getMessage('showAll'))
      .toBe('Show all');
  });
});
