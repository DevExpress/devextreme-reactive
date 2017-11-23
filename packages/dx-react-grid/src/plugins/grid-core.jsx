import React from 'react';
import PropTypes from 'prop-types';
import { PluginContainer, Getter, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';
import { rowIdGetter, cellValueGetter } from '@devexpress/dx-grid-core';

export class GridCore extends React.PureComponent {
  render() {
    const {
      rows,
      columns,
      getRowId,
      getCellValue,
      rootComponent: Root,
      headerPlaceholderComponent: HeaderPlaceholder,
      footerPlaceholderComponent: FooterPlaceholder,
    } = this.props;

    return (
      <PluginContainer>
        <Getter name="rows" value={rows} />
        <Getter name="getRowId" value={rowIdGetter(getRowId, rows)} />
        <Getter name="columns" value={columns} />
        <Getter name="getCellValue" value={cellValueGetter(getCellValue, columns)} />
        <Template name="header" />
        <Template name="body" />
        <Template name="footer" />
        <Template name="root">
          <Root>
            <TemplatePlaceholder name="header">
              {content => (HeaderPlaceholder
                ? <HeaderPlaceholder>{content}</HeaderPlaceholder>
                : content)}
            </TemplatePlaceholder>
            <TemplatePlaceholder name="body" />
            <TemplatePlaceholder name="footer">
              {content => (FooterPlaceholder
                ? <FooterPlaceholder>{content}</FooterPlaceholder>
                : content)}
            </TemplatePlaceholder>
          </Root>
        </Template>
      </PluginContainer>
    );
  }
}

GridCore.propTypes = {
  rows: PropTypes.array.isRequired,
  getRowId: PropTypes.func,
  getCellValue: PropTypes.func,
  columns: PropTypes.array.isRequired,
  rootComponent: PropTypes.func.isRequired,
  headerPlaceholderComponent: PropTypes.func,
  footerPlaceholderComponent: PropTypes.func,
};

GridCore.defaultProps = {
  getRowId: null,
  getCellValue: null,
  headerPlaceholderComponent: null,
  footerPlaceholderComponent: null,
};
