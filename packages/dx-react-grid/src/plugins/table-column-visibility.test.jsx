import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { visibleTableColumns, getMessagesFormatter } from '@devexpress/dx-grid-core';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from './test-utils';
import { TableColumnVisibility } from './table-column-visibility';

jest.mock('@devexpress/dx-grid-core', () => ({
  visibleTableColumns: jest.fn(),
  getMessagesFormatter: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableColumns: [
      { column: { name: 'a' } },
      { column: { name: 'b' } },
      { column: { name: 'c' } },
    ],
  },
  template: {
    table: {},
  },
  plugins: ['Table'],
};

describe('TableColumnVisibility', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    visibleTableColumns.mockImplementation(() => [{ column: { name: 'c' } }]);
    getMessagesFormatter.mockImplementation(messages => key => (messages[key] || key));
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call the visibleTableColumns computed with correct arguments', () => {
    const hiddenColumns = ['b', 'a'];
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableColumnVisibility
          hiddenColumns={hiddenColumns}
          emptyMessageTemplate={() => null}
        />
      </PluginHost>
    ));

    expect(visibleTableColumns)
      .toHaveBeenCalledWith(defaultDeps.getter.tableColumns, hiddenColumns);
  });

  it('should remove hidden columns from tableColumns', () => {
    const hiddenColumns = ['b', 'a'];
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableColumnVisibility
          hiddenColumns={hiddenColumns}
          emptyMessageTemplate={() => null}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).getters.tableColumns)
      .toEqual([{ column: { name: 'c' } }]);
  });

  it('should force the empty message rendering if all columns are hidden', () => {
    const emptyMessageTemplate = jest.fn(() => null);
    visibleTableColumns.mockImplementation(() => []);

    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableColumnVisibility
          hiddenColumns={[]}
          emptyMessageTemplate={emptyMessageTemplate}
          messages={{
            noColumns: 'Nothing to show',
          }}
        />
      </PluginHost>
    ));
    const { getMessage } = emptyMessageTemplate.mock.calls[0][0];

    expect(emptyMessageTemplate)
      .toHaveBeenCalledTimes(1);
    expect(getMessage('noColumns'))
      .toBe('Nothing to show');
  });
});
