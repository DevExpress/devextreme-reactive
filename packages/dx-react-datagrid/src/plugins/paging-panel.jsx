import React from 'react';
import { Template, TemplatePlaceholder } from '@devexpress/dx-react-core';

export const PagingPanel = props => (
  <div>
    <Template name="gridFooter">
      <div>
        <TemplatePlaceholder name="pager" />
        <TemplatePlaceholder />
      </div>
    </Template>
    <Template
      name="pager"
      connectGetters={getter => ({
        currentPage: getter('currentPage')(),
        totalPages: getter('totalPages')(),
      })}
      connectActions={action => ({
        onCurrentPageChange: page => action('setCurrentPage')({ page }),
      })}
    >
      {props.pagerTemplate}
    </Template>
  </div>
);

PagingPanel.propTypes = {
  pagerTemplate: React.PropTypes.func.isRequired,
};
