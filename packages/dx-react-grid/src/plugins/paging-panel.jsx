import React from 'react';
import PropTypes from 'prop-types';
import { Template, TemplatePlaceholder, PluginContainer } from '@devexpress/dx-react-core';
import { firstRowIndex, lastRowIndex } from '@devexpress/dx-grid-core';

export const PagingPanel = ({ pagerTemplate, allowedPageSizes }) => (
  <PluginContainer>
    <Template name="footer">
      <div>
        <TemplatePlaceholder name="pager" />
        <TemplatePlaceholder />
      </div>
    </Template>
    <Template
      name="pager"
      connectGetters={getter => ({
        currentPage: getter('currentPage'),
        totalPages: getter('totalPages'),
        pageSize: getter('pageSize'),
        totalCount: getter('totalCount'),
        firstRowIndex: firstRowIndex(getter('currentPage'), getter('pageSize')),
        lastRowIndex: lastRowIndex(getter('currentPage'), getter('pageSize'), getter('totalCount')),
        allowedPageSizes,
      })}
      connectActions={action => ({
        onCurrentPageChange: page => action('setCurrentPage')({ page }),
        onPageSizeChange: size => action('setPageSize')({ size }),
      })}
    >
      {pagerTemplate}
    </Template>
  </PluginContainer>
);

PagingPanel.propTypes = {
  allowedPageSizes: PropTypes.arrayOf(PropTypes.number),
  pagerTemplate: PropTypes.func.isRequired,
};

PagingPanel.defaultProps = {
  allowedPageSizes: [],
};
