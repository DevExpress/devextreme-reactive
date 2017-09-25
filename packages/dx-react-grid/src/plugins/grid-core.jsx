import React from 'react';
import PropTypes from 'prop-types';
import { memoize } from '@devexpress/dx-core';
import { PluginContainer, Getter, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';

const rowIdGetter = (rows) => {
  const rowsMap = new Map(rows.map((r, rowIndex) => [r, rowIndex]));
  return row => rowsMap.get(row);
};

const getCellValueGetter = (columns) => {
  let useFastAccessor = true;

  const map = columns.reduce((acc, column) => {
    if (column.getCellValue) {
      useFastAccessor = false;
      acc[column.name] = column.getCellValue;
    }
    return acc;
  }, {});

  return useFastAccessor ?
    (rowData, columnName) => rowData[columnName] :
    (rowData, columnName) => (map[columnName]
      ? map[columnName](rowData, columnName) : rowData[columnName]);
};

export class GridCore extends React.PureComponent {
  constructor(props) {
    super(props);
    this.memoizedRowIdGetter = memoize(rowIdGetter);
    this.memoizedCellValueGetter = memoize(getCellValueGetter);
  }
  render() {
    const {
      data,
      columns,
      getRowDataId,
      getCellValue,
      rootTemplate,
      headerPlaceholderTemplate,
      footerPlaceholderTemplate,
    } = this.props;

    return (
      <PluginContainer>
        <Getter name="rows" value={data} />
        <Getter name="columns" value={columns} />
        <Getter name="getRowDataId" value={getRowDataId || this.memoizedRowIdGetter(data)} />
        <Getter name="getCellValue" value={getCellValue || this.memoizedCellValueGetter(columns)} />
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
      </PluginContainer>
    );
  }
}

GridCore.propTypes = {
  data: PropTypes.array.isRequired,
  getRowDataId: PropTypes.func,
  getCellValue: PropTypes.func,
  columns: PropTypes.array.isRequired,
  rootTemplate: PropTypes.func.isRequired,
  headerPlaceholderTemplate: PropTypes.func,
  footerPlaceholderTemplate: PropTypes.func,
};

GridCore.defaultProps = {
  getRowDataId: null,
  getCellValue: null,
  headerPlaceholderTemplate: null,
  footerPlaceholderTemplate: null,
};
