import React from 'react';
import PropTypes from 'prop-types';

import { Template, TemplatePlaceholder, PluginContainer } from '@devexpress/dx-react-core';

export class GroupingPanel extends React.PureComponent {
  render() {
    const {
      groupPanelTemplate,
      allowSorting,
      allowDragging, allowDropping,
    } = this.props;

    return (
      <PluginContainer>
        <Template
          name="header"
          connectGetters={getter => ({
            groupedColumns: getter('visuallyGroupedColumns'),
            sorting: getter('sorting'),
          })}
          connectActions={action => ({
            groupByColumn: action('groupByColumn'),
            changeSortingDirection: ({ keepOther, cancel, columnName }) =>
              action('setColumnSorting')({ columnName, keepOther, cancel }),
            startGroupingChange: groupingChange => action('startGroupingChange')(groupingChange),
            cancelGroupingChange: () => action('cancelGroupingChange')(),
          })}
        >
          {params => (
            <div>
              {groupPanelTemplate({
                allowSorting,
                allowDragging,
                allowDropping,
                ...params,
              })}
              <TemplatePlaceholder />
            </div>
          )}
        </Template>
      </PluginContainer>
    );
  }
}

GroupingPanel.propTypes = {
  allowSorting: PropTypes.bool,
  allowDragging: PropTypes.bool,
  allowDropping: PropTypes.bool,
  groupPanelTemplate: PropTypes.func.isRequired,
};

GroupingPanel.defaultProps = {
  allowSorting: false,
  allowDragging: false,
  allowDropping: false,
};
