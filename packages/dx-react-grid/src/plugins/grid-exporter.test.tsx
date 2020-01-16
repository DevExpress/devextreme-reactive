import * as React from 'react';
import { mount } from 'enzyme';
import { GridExporter } from './grid-exporter';
import { GridExporterCore } from './grid-exporter-core';

jest.mock('./grid-exporter-core', () => ({
  GridExporterCore: jest.fn(),
}));

describe('GridExporter', () => {
  beforeEach(() => {
    GridExporterCore.mockReturnValue(null);
  });

  it('should render core exporter only when export initiated', () => {
    const exporterRef = React.createRef();
    const tree = mount((
      <GridExporter ref={exporterRef} />
    ));

    expect(tree.find(GridExporter).children().length)
      .toBe(0);
    expect(GridExporterCore)
      .not.toHaveBeenCalled();

    exporterRef.current.exportGrid();

    expect(GridExporterCore)
      .toHaveBeenCalledTimes(1);
  });

  it('should pass all props to exporter', () => {
    const props = {
      rows: [],
      a: 1,
    };
    const tree = mount((
      <GridExporter
        {...props}
      />
    ));

    tree.find(GridExporter).setState({ isExporting: true });

    expect(tree.find(GridExporterCore).props())
      .toEqual(props);
  });
});
