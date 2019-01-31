import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin, Getter, Template, TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { rowIdGetter, cellValueGetter } from '@devexpress/dx-grid-core';

export class GridCore extends React.PureComponent {
  render() {
    const {
      rows,
      columns,
      isRtl,
      getRowId,
      getCellValue,
      rootComponent: Root,
    } = this.props;

    return (
      <Plugin>
        <Getter name="isRtl" value={isRtl} />
        <Getter name="rows" value={rows} />
        <Getter name="getRowId" value={rowIdGetter(getRowId, rows)} />
        <Getter name="columns" value={columns} />
        <Getter name="getCellValue" value={cellValueGetter(getCellValue, columns)} />
        <Template name="root">
          <Root>
            <TemplatePlaceholder name="header" />
            <TemplatePlaceholder name="body" />
            <TemplatePlaceholder name="footer" />
          </Root>
        </Template>
      </Plugin>
    );
  }
}

GridCore.propTypes = {
  isRtl: PropTypes.bool,
  rows: PropTypes.array.isRequired,
  getRowId: PropTypes.func,
  getCellValue: PropTypes.func,
  columns: PropTypes.array.isRequired,
  rootComponent: PropTypes.func.isRequired,
};

GridCore.defaultProps = {
  isRtl: undefined,
  getRowId: undefined,
  getCellValue: undefined,
};
