import React from 'react';
import PropTypes from 'prop-types';
import { Template, TemplatePlaceholder, PluginContainer } from '@devexpress/dx-react-core';

export const PagingPanel = props => (
  <PluginContainer>
    <Template name="gridFooter">
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
      })}
      connectActions={action => ({
        onCurrentPageChange: page => action('setCurrentPage')({ page }),
      })}
    >
      {props.pagerTemplate}
    </Template>
  </PluginContainer>
);

PagingPanel.propTypes = {
  pagerTemplate: PropTypes.func.isRequired,
};
