import * as React from 'react';
import {
  Getter, Plugin, Getters,
} from '@devexpress/dx-react-core';
import { tableColumnsWithGrouping } from '@devexpress/dx-grid-core';
import { ShowColumnWhenGroupedGetterFn, TableColumnsWithGroupingProps } from '../../types';

const showColumnWhenGroupedGetter: ShowColumnWhenGroupedGetterFn = (
  showColumnsWhenGrouped, columnExtensions = [],
) => {
  const map = columnExtensions.reduce((acc, columnExtension) => {
    acc[columnExtension.columnName] = columnExtension.showWhenGrouped;
    return acc;
  }, {});

  return columnName => map[columnName] || showColumnsWhenGrouped;
};

/** @internal */
export const TableColumnsWithGrouping: React.FunctionComponent<
  TableColumnsWithGroupingProps
> = React.memo(({
  indentColumnWidth, showColumnsWhenGrouped, columnExtensions,
}) => {
  const tableColumnsComputed = ({
    columns, tableColumns, grouping, draftGrouping,
  }: Getters) => tableColumnsWithGrouping(
    columns,
    tableColumns,
    grouping,
    draftGrouping,
    indentColumnWidth!,
    showColumnWhenGroupedGetter(showColumnsWhenGrouped!, columnExtensions),
  );

  return (
    <Plugin>
      <Getter name="tableColumns" computed={tableColumnsComputed} />
    </Plugin>
  );
});

TableColumnsWithGrouping.defaultProps = {
  indentColumnWidth: 0,
};

