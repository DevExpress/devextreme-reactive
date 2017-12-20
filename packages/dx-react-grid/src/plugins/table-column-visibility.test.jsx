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

const DefaultEmptyMessage = () => null;

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
          emptyMessageComponent={DefaultEmptyMessage}
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
          emptyMessageComponent={DefaultEmptyMessage}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).tableColumns)
      .toEqual([{ column: { name: 'c' } }]);
  });

  it('should force the empty message rendering if all columns are hidden', () => {
    visibleTableColumns.mockImplementation(() => []);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableColumnVisibility
          hiddenColumns={[]}
          emptyMessageComponent={DefaultEmptyMessage}
          messages={{
            noColumns: 'Nothing to show',
          }}
        />
      </PluginHost>
    ));
    const getMessage = tree.find(DefaultEmptyMessage)
      .prop('getMessage');

    expect(getMessage('noColumns'))
      .toBe('Nothing to show');
  });
});
