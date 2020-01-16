import * as React from 'react';
import {
  Action, Plugin, PluginHost,
} from '@devexpress/dx-react-core';
import { GridExporterCore } from './grid-exporter-core';
import { ExporterProps } from '../types';
import { ExporterState } from '../types/export/exporter.types';

class GridExporterBase extends React.PureComponent<ExporterProps, ExporterState> {
  state = {
    isExporting: false,
  };

  exportGrid = () => {
    this.setState({ isExporting: true });
  }

  finishExport = () => {
    // NOTE: we can't update state during the render phase
    window.setTimeout(() => {
      this.setState({ isExporting: false });
    }, 0);
  }

  render() {
    const { isExporting } = this.state;
    if (!isExporting) return null;

    return (
      <PluginHost>
        <Plugin name="export">
          <Action name="finishExport" action={this.finishExport} />
        </Plugin>        
        <GridExporterCore {...this.props} />
      </PluginHost>
    );
  }
}

export const GridExporter: React.ComponentType<ExporterProps> = GridExporterBase;
