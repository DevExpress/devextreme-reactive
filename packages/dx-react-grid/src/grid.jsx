import React from 'react';
import PropTypes from 'prop-types';
import { PluginHost, Getter, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';

const rowIdGetter = (getRowId, rows) => {
  let rowsMap;
  return (row) => {
    const originalRow = row._originalRow || row;
    if (getRowId) return getRowId(originalRow);
    if (!rowsMap) rowsMap = new Map(rows.map((r, rowIndex) => [r, rowIndex]));
    return rowsMap.get(originalRow);
  };
};

export const Grid = ({
  rows, getRowId, columns,
  rootTemplate, headerPlaceholderTemplate, footerPlaceholderTemplate,
  children,
}) => (
  <PluginHost>
    <Getter name="rows" value={rows} />
    <Getter name="columns" value={columns} />
    <Getter
      name="getRowId"
      pureComputed={rowIdGetter}
      connectArgs={() => [getRowId, rows]}
    />
    <Template name="gridHeading" />
    <Template name="gridBody" />
    <Template name="gridFooter" />
    <Template name="root">
      {() => rootTemplate({
        headerTemplate: () => (
          <TemplatePlaceholder name="gridHeading">
            {content => headerPlaceholderTemplate({ content })}
          </TemplatePlaceholder>
        ),
        bodyTemplate: () => <TemplatePlaceholder name="gridBody" />,
        footerTemplate: () => (
          <TemplatePlaceholder name="gridFooter">
            {content => footerPlaceholderTemplate({ content })}
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
  columns: PropTypes.array.isRequired,
  rootTemplate: PropTypes.func.isRequired,
  headerPlaceholderTemplate: PropTypes.func.isRequired,
  footerPlaceholderTemplate: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Grid.defaultProps = {
  getRowId: null,
};
