import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { TableLayout } from '@devexpress/dx-react-grid';
import { Table } from './table';

jest.mock('@devexpress/dx-react-grid', () => ({
  TableLayout: jest.fn(),
}));

describe('Table', () => {
  configure({ adapter: new Adapter() });
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

  it('should pass rowTemplate to TableLayout', () => {
    const rowTemplateMock = jest.fn();
    const rowTemplateArgs = {
      row: 'row',
      children: null,
    };
    TableLayout.mockImplementation(({ rowTemplate }) => (
      <table>
        {rowTemplate(rowTemplateArgs)}
      </table>
    ));

    mount(
      <Table
        rowTemplate={rowTemplateMock}
        headerRows={[]}
        bodyRows={[]}
        columns={[]}
        cellTemplate={() => {}}
        allowColumnReordering={false}
        setColumnOrder={() => {}}
      />,
    );

    expect(rowTemplateMock).toBeCalledWith(rowTemplateArgs);
  });
});
