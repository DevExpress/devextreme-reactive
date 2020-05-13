import * as React from 'react';
import {
  Action, Plugin, PluginHost,
} from '@devexpress/dx-react-core';
import { GridExporterCore } from './grid-exporter-core';
import { ExporterProps, ExporterState } from '../types/export/exporter.types';

class GridExporterBase extends React.PureComponent<ExporterProps, ExporterState> {
  state = {
    isExporting: false,
    selectedOnly: false,
  };

  exportGrid = (options) => {
    this.setState({
      isExporting: true,
      selectedOnly: false,
      ...options,
    });
  }

  finishExport = () => {
    // NOTE: we can't update state during the render phase
    window.setTimeout(() => {
      this.setState({
        isExporting: false,
        selectedOnly: false,
      });
    }, 0);
  }

  render() {
    const { isExporting, selectedOnly } = this.state;
    if (!isExporting) return null;

    return (
      <PluginHost>
        <Plugin name="export">
          <Action name="finishExport" action={this.finishExport} />
        </Plugin>
        <GridExporterCore
          {...this.props}
          exportSelected={selectedOnly}
        />
      </PluginHost>
    );
  }
}

export const GridExporter: React.ComponentType<ExporterProps> = GridExporterBase;
