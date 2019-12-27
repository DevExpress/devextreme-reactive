import * as React from 'react';
import {
  Plugin, Getter, Template, TemplatePlaceholder, Action,
} from '@devexpress/dx-react-core';
import { rowIdGetter, cellValueGetter } from '@devexpress/dx-grid-core';
import { GridProps } from '../types';

export class GridCore extends React.PureComponent<GridProps, any> {
  endExportAction: () => void;
  startExportAction: (_: any, __: any, { startExport }: any) => void;
  constructor(props) {
    super(props);
    this.state = {
      isExporting: false,
    };

    this.startExportAction = () => {
      this.setState({ isExporting: true });
      this.forceUpdate();
      // startExport();
    };
    this.endExportAction = () => {
      this.setState({ isExporting: false });
    }
  }
  render() {
    const {
      rows,
      columns,
      getRowId,
      getCellValue,
      rootComponent: Root,
    } = this.props;
    const { isExporting } = this.state;

    return (
      <Plugin>
        <Getter name="skip" value={0} />
        <Getter name="loadedRowsStart" value={0} />
        <Getter name="rows" value={rows} />
        <Getter name="getRowId" value={rowIdGetter(getRowId!, rows)} />
        <Getter name="columns" value={columns} />
        <Getter name="getCellValue" value={cellValueGetter(getCellValue!, columns)} />
        <Getter name="isExporting" value={isExporting} />
        {/* <Action name="startExport" action={() => {}} /> */}
        <Action name="initiateExport" action={this.startExportAction} />
        <Action name="finishExport" action={this.endExportAction} />

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
