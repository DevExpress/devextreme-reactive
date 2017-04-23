import React from 'react';
import { Template, TemplatePlaceholder, PluginContainer } from '@devexpress/dx-react-core';
import { getColumnSortingDirection } from '@devexpress/dx-datagrid-core';

export const GroupingPanelSorting = (props) => {
  const SortableGroupCell = props.sortableGroupCellTemplate;

  return (
    <PluginContainer>
      <Template
        name="groupingPanelCellContent"
        connectGetters={(getter, { column }) => ({
          column,
          direction: getColumnSortingDirection(getter('sortings'), column.name),
        })}
        connectActions={(action, { column }) => ({
          setColumnSorting: ({ keepOther }) => action('setColumnSorting')({ columnName: column.name, keepOther }),
        })}
      >
        {({ direction, setColumnSorting, column }) => (
          <SortableGroupCell
            direction={direction}
            toggleSorting={
              ({ keepOther }) => setColumnSorting({ columnName: column.name, keepOther })
            }
          >
            <TemplatePlaceholder />
          </SortableGroupCell>
        )}
      </Template>
    </PluginContainer>
  );
};

GroupingPanelSorting.propTypes = {
  sortableGroupCellTemplate: React.PropTypes.func.isRequired,
};
