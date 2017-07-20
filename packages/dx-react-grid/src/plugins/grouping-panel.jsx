import React from 'react';
import PropTypes from 'prop-types';

import { Template, TemplatePlaceholder, PluginContainer } from '@devexpress/dx-react-core';

export class GroupingPanel extends React.PureComponent {
  render() {
    const {
      groupPanelTemplate,
      allowSorting,
      allowDraggingAndDropping,
      allowUngroupingByClick,
    } = this.props;

    return (
      <PluginContainer>
        <Template
          name="header"
          connectGetters={getter => ({
            groupedColumns: getter('draftGroupedColumns'),
            sorting: getter('sorting'),
          })}
          connectActions={action => ({
            groupByColumn: action('groupByColumn'),
            changeSortingDirection: ({ columnName, keepOther, cancel }) =>
              action('setColumnSorting')({ columnName, keepOther, cancel }),
            draftGroupingChange: groupingChange => action('draftGroupingChange')(groupingChange),
            cancelGroupingChange: () => action('cancelGroupingChange')(),
          })}
        >
          {params => (
            <div>
              {groupPanelTemplate({
                allowSorting,
                allowDraggingAndDropping,
                allowUngroupingByClick,
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
  allowDraggingAndDropping: PropTypes.bool,
  allowUngroupingByClick: PropTypes.bool,
  groupPanelTemplate: PropTypes.func.isRequired,
};

GroupingPanel.defaultProps = {
  allowSorting: false,
  allowDraggingAndDropping: false,
  allowUngroupingByClick: false,
};
