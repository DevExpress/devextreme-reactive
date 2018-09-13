import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Template, TemplatePlaceholder, Plugin,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { pageCount } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'PagingState' },
];

export class PagingPanel extends React.PureComponent {
  render() {
    const {
      containerComponent: Pager,
      pageSizes,
      messages,
    } = this.props;
    const getMessage = getMessagesFormatter(messages);

    return (
      <Plugin
        name="PagingPanel"
        dependencies={pluginDependencies}
      >
        <Template name="footer">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ currentPage, pageSize, totalCount }, { setCurrentPage, setPageSize }) => (
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
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

PagingPanel.propTypes = {
  pageSizes: PropTypes.arrayOf(PropTypes.number),
  containerComponent: PropTypes.func.isRequired,
  messages: PropTypes.object,
};

PagingPanel.defaultProps = {
  pageSizes: [],
  messages: {},
};
