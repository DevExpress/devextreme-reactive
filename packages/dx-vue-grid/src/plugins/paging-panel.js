import {
  Template, TemplatePlaceholder,
  TemplateConnector, Plugin,
} from '@devexpress/dx-vue-core';
import { pageCount, getMessagesFormatter } from '@devexpress/dx-grid-core';

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
      <Plugin
        name="DxPagingPanel"
        dependencies={pluginDependencies}
      >
        <Template name="footer">
          <div> {/* TODO: Wrapper required for multiple children */}
            <TemplatePlaceholder />
            <TemplateConnector>
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
            </TemplateConnector>
          </div>
        </Template>
      </Plugin>
    );
  },
};
