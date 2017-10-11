import React from 'react';
import PropTypes from 'prop-types';
import {
  Template, TemplatePlaceholder, PluginContainer,
  TemplateConnector, TemplateRenderer,
} from '@devexpress/dx-react-core';
import { pageCount } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'PagingState' },
];

const getMessageFn = messages => (name, params) => {
  const message = messages[name];
  if (message && name === 'info') {
    const { firstRow, lastRow, totalCount } = params;
    return message
      .replace('{firstRow}', firstRow)
      .replace('{lastRow}', lastRow)
      .replace('{totalCount}', totalCount);
  }
  return message;
};

const getPagerTemplateArgs = (
  { allowedPageSizes, messages },
  { currentPage, pageSize, totalCount },
  { setCurrentPage, setPageSize },
) => ({
  currentPage,
  totalPages: pageCount(totalCount, pageSize),
  pageSize,
  totalCount,
  allowedPageSizes,
  onCurrentPageChange: setCurrentPage,
  onPageSizeChange: setPageSize,
  getMessage: getMessageFn(messages),
});

export class PagingPanel extends React.PureComponent {
  render() {
    const { pagerTemplate, allowedPageSizes, messages } = this.props;

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
                  params={getPagerTemplateArgs({ allowedPageSizes, messages }, getters, actions)}
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
  messages: PropTypes.shape({
    showAll: PropTypes.string,
    rowsPerPage: PropTypes.string,
    info: PropTypes.string,
  }),
};

PagingPanel.defaultProps = {
  allowedPageSizes: [],
  messages: {},
};
