import {
  DxTemplate, DxTemplatePlaceholder,
  DxTemplateConnector, DxPlugin,
} from '@devexpress/dx-vue-core';
import { getMessagesFormatter } from '@devexpress/dx-core';
import { pageCount } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'DxPagingState' },
];

export const DxPagingPanel = {
  name: 'DxPagingPanel',
  props: {
    pageSizes: {
      type: Array,
      default: () => [],
    },
    messages: {
      type: Object,
    },
    containerComponent: {
      type: Object,
      required: true,
    },
  },

  render() {
    const {
      containerComponent: Pager,
      pageSizes,
      messages,
    } = this;
    const getMessage = getMessagesFormatter(messages);

    return (
      <DxPlugin
        name="DxPagingPanel"
        dependencies={pluginDependencies}
      >
        <DxTemplate name="footer">
          <div> {/* TODO: Wrapper required for multiple children */}
            <DxTemplatePlaceholder />
            <DxTemplateConnector>
              {({
                getters: { currentPage, pageSize, totalCount },
                actions: { setCurrentPage, setPageSize },
              }) => (
                  <Pager
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalCount={totalCount}
                    totalPages={pageCount(totalCount, pageSize)}
                    pageSizes={pageSizes}
                    getMessage={getMessage}
                    onCurrentPageChange={setCurrentPage}
                    onPageSizeChange={setPageSize}
                  />
              )
              }
            </DxTemplateConnector>
          </div>
        </DxTemplate>
      </DxPlugin>
    );
  },
};
