import React from 'react';
import PropTypes from 'prop-types';
import { Template, TemplatePlaceholder, PluginContainer } from '@devexpress/dx-react-core';
import { pageCount } from '@devexpress/dx-grid-core';

const PLUGIN_DEPENDENCIES = [
  { pluginName: 'PagingState' },
];

// eslint-disable-next-line react/prefer-stateless-function
export class PagingPanel extends React.PureComponent {
  render() {
    const { pagerTemplate, allowedPageSizes } = this.props;
    return (
      <PluginContainer
        pluginName="PagingPanel"
        dependencies={PLUGIN_DEPENDENCIES}
      >
        <Template
          name="footer"
          connectGetters={(getter) => {
            const pageSize = getter('pageSize');
            const totalCount = getter('totalCount');
            return {
              currentPage: getter('currentPage'),
              totalPages: pageCount(totalCount, pageSize),
              pageSize,
              totalCount,
              allowedPageSizes,
            };
          }}
          connectActions={action => ({
            onCurrentPageChange: page => action('setCurrentPage')(page),
            onPageSizeChange: size => action('setPageSize')(size),
          })}
        >
          {params => (
            <div>
              <TemplatePlaceholder />
              {pagerTemplate(params)}
            </div>
          )}
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
