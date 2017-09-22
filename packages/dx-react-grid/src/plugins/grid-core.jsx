import React from 'react';
import PropTypes from 'prop-types';
import { memoize } from '@devexpress/dx-core';
import { PluginContainer, Getter, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';

const rowIdGetter = (rows) => {
  const rowsMap = new Map(rows.map((r, rowIndex) => [r, rowIndex]));
  return row => rowsMap.get(row);
};

const getCellDataGetter = (columns) => {
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

export class GridCore extends React.PureComponent {
  constructor(props) {
    super(props);
    this.memoizedRowIdGetter = memoize(rowIdGetter);
    this.memoizedGetCellDataGetter = memoize(getCellDataGetter);
  }
  render() {
    const {
      rows,
      columns,
      getRowId,
      getCellData,
      rootTemplate,
      headerPlaceholderTemplate,
      footerPlaceholderTemplate,
    } = this.props;

    return (
      <PluginContainer>
        <Getter name="rows" value={rows} />
        <Getter name="columns" value={columns} />
        <Getter name="getRowId" value={getRowId || this.memoizedRowIdGetter(rows)} />
        <Getter name="getCellData" value={getCellData || this.memoizedGetCellDataGetter(columns)} />
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
      </PluginContainer>
    );
  }
}

GridCore.propTypes = {
  rows: PropTypes.array.isRequired,
  getRowId: PropTypes.func,
  getCellData: PropTypes.func,
  columns: PropTypes.array.isRequired,
  rootTemplate: PropTypes.func.isRequired,
  headerPlaceholderTemplate: PropTypes.func,
  footerPlaceholderTemplate: PropTypes.func,
};

GridCore.defaultProps = {
  getRowId: null,
  getCellData: null,
  headerPlaceholderTemplate: null,
  footerPlaceholderTemplate: null,
};
