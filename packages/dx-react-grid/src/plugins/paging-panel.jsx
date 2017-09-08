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

const getPagerTemplateArgs = ({
  getters: { currentPage, pageSize, totalCount },
  actions: { setCurrentPage, setPageSize },
  scope: { allowedPageSizes },
}) => ({
  currentPage,
  totalPages: pageCount(totalCount, pageSize),
  pageSize,
  totalCount,
  allowedPageSizes,
  onCurrentPageChange: setCurrentPage,
  onPageSizeChange: setPageSize,
});


export class PagingPanel extends React.PureComponent {
  render() {
    const { pagerTemplate, allowedPageSizes } = this.props;

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
                  params={getPagerTemplateArgs({ getters, actions, scope: { allowedPageSizes } })}
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
};

PagingPanel.defaultProps = {
  allowedPageSizes: [],
};
