import React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { TableView } from './table-view';

jest.mock('../templates/table', () => ({
  // eslint-disable-next-line react/prop-types
  Table: ({ tableRowComponentTemplate }) => <div>{tableRowComponentTemplate()}</div>,
}));

jest.mock('@devexpress/dx-react-grid', () => ({
  // eslint-disable-next-line react/prop-types
  TableView: ({ tableTemplate }) => <div>{tableTemplate()}</div>,
}));


describe('TableView', () => {
  it('should pass tableRowComponentTemplate to Table', () => {
    const tableTowComponentTemplateMock = jest.fn();
    mount(
      <PluginHost>
        <TableView
          tableRowComponentTemplate={tableTowComponentTemplateMock}
        />
      </PluginHost>,
    );

    expect(tableTowComponentTemplateMock.mock.calls.length).toBe(1);
  });
});
