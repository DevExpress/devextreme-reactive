import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { TableLayout } from '@devexpress/dx-react-grid';
import { Table } from './table';

jest.mock('@devexpress/dx-react-grid', () => ({
  TableLayout: jest.fn(),
}));


describe('Table', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should pass tableRowComponentTemplate to TableLayout', () => {
    const tableTowComponentTemplateMock = jest.fn();
    TableLayout.mockImplementation(({ rowTemplate }) => <table>{rowTemplate({ row: { type: 'data' } })}</table>);

    mount(
      <Table
        tableRowComponentTemplate={tableTowComponentTemplateMock}
        headerRows={[]}
        bodyRows={[]}
        columns={[]}
        cellTemplate={() => {}}
        getRowId={() => {}}
        allowColumnReordering={false}
        setColumnOrder={() => {}}
      />,
    );
    const mockCalls = tableTowComponentTemplateMock.mock.calls;

    expect(mockCalls).toHaveLength(1);
    expect(mockCalls[0][0]).toEqual({ tableRow: { type: 'data' } });
  });

  it('should not pass tableRowComponentTemplate to TableLayout if row type jsn\'t "data"', () => {
    const tableTowComponentTemplateMock = jest.fn();
    TableLayout.mockImplementation(({ rowTemplate }) => <table>{rowTemplate({ row: { type: 'filtering' } })}</table>);

    mount(
      <Table
        tableRowComponentTemplate={tableTowComponentTemplateMock}
        headerRows={[]}
        bodyRows={[]}
        columns={[]}
        cellTemplate={() => {}}
        getRowId={() => {}}
        allowColumnReordering={false}
        setColumnOrder={() => {}}
      />,
    );

    expect(tableTowComponentTemplateMock.mock.calls).toHaveLength(0);
  });
});
