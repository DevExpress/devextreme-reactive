import React from 'react';
import PropTypes from 'prop-types';
import {
  Template, TemplatePlaceholder, PluginContainer,
  TemplateConnector, TemplateRenderer,
} from '@devexpress/dx-react-core';
import { pageCount, getMessagesFormatter } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'PagingState' },
];

const getPagerTemplateArgs = (
  { allowedPageSizes, getMessage },
  { currentPage, pageSize, totalCount },
  { setCurrentPage, setPageSize },
) => ({
  currentPage,
  totalPages: pageCount(totalCount, pageSize),
  pageSize,
  totalCount,
  allowedPageSizes,
  getMessage,
  onCurrentPageChange: setCurrentPage,
  onPageSizeChange: setPageSize,
});

export class PagingPanel extends React.PureComponent {
  render() {
    const { pagerTemplate, allowedPageSizes, messages } = this.props;
    const getMessage = getMessagesFormatter(messages);

    return (
      <PluginContainer
        pluginName="PagingPanel"
        dependencies={pluginDependencies}
      >
        <Template name="footer">
          <div>
            <TemplatePlaceholder />
            <TemplateConnector>
              {(getters, actions) => (
                <TemplateRenderer
                  template={pagerTemplate}
                  params={getPagerTemplateArgs({ allowedPageSizes, getMessage }, getters, actions)}
                />
              )}
            </TemplateConnector>
          </div>
        </Template>
      </PluginContainer>
    );
  }
}

PagingPanel.propTypes = {
  allowedPageSizes: PropTypes.arrayOf(PropTypes.number),
  pagerTemplate: PropTypes.func.isRequired,
  messages: PropTypes.object,
};

PagingPanel.defaultProps = {
  allowedPageSizes: [],
  messages: {},
};
