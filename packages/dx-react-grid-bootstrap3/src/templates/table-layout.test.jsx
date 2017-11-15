import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { TableLayout as TableLayoutCore } from '@devexpress/dx-react-grid';
import { TableLayout } from './table-layout';

jest.mock('@devexpress/dx-react-grid', () => ({
  TableLayout: jest.fn(),
}));

describe('TableLayout', () => {
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

  it('should pass rowComponent to TableLayoutCore', () => {
    const rowTemplateMock = jest.fn();
    const rowTemplateArgs = {
      row: 'row',
      children: null,
    };
    TableLayoutCore.mockImplementation(({ rowComponent }) => (
      <table>
        {rowComponent(rowTemplateArgs)}
      </table>
    ));

    mount((
      <TableLayout
        rowComponent={rowTemplateMock}
        headerRows={[]}
        bodyRows={[]}
        columns={[]}
        cellComponent={() => {}}
      />
    ));

    expect(rowTemplateMock).toBeCalledWith(rowTemplateArgs);
  });
});
