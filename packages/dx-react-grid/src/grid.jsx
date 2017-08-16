import React from 'react';
import PropTypes from 'prop-types';
import { PluginHost, Getter, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';

const rowIdGetter = (getRowId, rows) => {
  let rowsMap;
  return (row) => {
    if (getRowId) return getRowId(row);
    if (!rowsMap) rowsMap = new Map(rows.map((r, rowIndex) => [r, rowIndex]));
    return rowsMap.get(row);
  };
};

const getCellDataGetter = (getCellData, columns) => {
  if (getCellData) {
    return getCellData;
  }

  let useFastAccessor = true;

  const map = columns.reduce((acc, column) => {
    if (column.getCellData) {
      useFastAccessor = false;
      acc[column.name] = column.getCellData;
    }
    return acc;
  }, {});

  return useFastAccessor ?
    (row, columnName) => row[columnName] :
    (row, columnName) => (map[columnName] ? map[columnName](row, columnName) : row[columnName]);
};

export const Grid = ({
  rows, getRowId, columns,
  rootTemplate, headerPlaceholderTemplate, footerPlaceholderTemplate,
  children, getCellData,
}) => (
  <PluginHost>
    <Getter name="rows" value={rows} />
    <Getter name="columns" value={columns} />
    <Getter
      name="getRowId"
      pureComputed={rowIdGetter}
      connectArgs={() => [getRowId, rows]}
    />
    <Getter
      name="getCellData"
      pureComputed={getCellDataGetter}
      connectArgs={() => [getCellData, columns]}
    />
    <Template name="header" />
    <Template name="body" />
    <Template name="footer" />
    <Template name="root">
      {() => rootTemplate({
        headerTemplate: () => (
          <TemplatePlaceholder name="header">
            {content => (headerPlaceholderTemplate
              ? headerPlaceholderTemplate({ children: content })
              : content)}
          </TemplatePlaceholder>
        ),
        bodyTemplate: () => <TemplatePlaceholder name="body" />,
        footerTemplate: () => (
          <TemplatePlaceholder name="footer">
            {content => (footerPlaceholderTemplate
              ? footerPlaceholderTemplate({ children: content })
              : content)}
          </TemplatePlaceholder>
        ),
      })}
    </Template>
    {children}
  </PluginHost>
);

Grid.propTypes = {
  rows: PropTypes.array.isRequired,
  getRowId: PropTypes.func,
  getCellData: PropTypes.func,
  columns: PropTypes.array.isRequired,
  rootTemplate: PropTypes.func.isRequired,
  headerPlaceholderTemplate: PropTypes.func,
  footerPlaceholderTemplate: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Grid.defaultProps = {
  getRowId: null,
  getCellData: null,
  headerPlaceholderTemplate: null,
  footerPlaceholderTemplate: null,
  children: null,
};
