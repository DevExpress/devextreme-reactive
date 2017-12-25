import React from 'react';
import PropTypes from 'prop-types';
import {
  Template, TemplatePlaceholder, PluginContainer,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { pageCount, getMessagesFormatter } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'PagingState' },
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
      <PluginContainer
        pluginName="PagingPanel"
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
      </PluginContainer>
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
