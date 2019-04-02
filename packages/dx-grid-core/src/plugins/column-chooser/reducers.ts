import { PureReducer } from '@devexpress/dx-core';

export const toggleColumn: PureReducer<string[], string> = (
  hiddenColumnNames, columnName,
) => (
  hiddenColumnNames.indexOf(columnName) === -1
    ? [...hiddenColumnNames, columnName]
    : hiddenColumnNames.filter(hiddenColumn => hiddenColumn !== columnName)
);
