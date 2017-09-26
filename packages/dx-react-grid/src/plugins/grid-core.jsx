import React from 'react';
import PropTypes from 'prop-types';
import { PluginContainer, Getter, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';
import { dataRows, rowIdGetter, cellValueGetter } from '@devexpress/dx-grid-core';

export class GridCore extends React.PureComponent {
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
        <Getter name="rows" value={dataRows(data)} />
        <Getter name="columns" value={columns} />
        <Getter name="getRowId" value={rowIdGetter(getRowDataId)} />
        <Getter name="getCellValue" value={cellValueGetter(getCellValue, columns)} />
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
