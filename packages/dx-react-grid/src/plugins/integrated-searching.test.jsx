import React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  searchCells,
} from '@devexpress/dx-grid-core';
import { IntegratedSearching } from './integrated-searching';
import { pluginDepsToComponents } from './test-utils';

const defaultDeps = {
  getter: {
    rows: [{ id: 0 }, { id: 1 }],
    columns: ['a', 'b'],
    searchValue: '',
    getCellValue: jest.fn(),
    isGroupRow: true,
    getRowLevelKey: jest.fn(),
  },
  plugins: ['SearchingState'],
};

jest.mock('@devexpress/dx-grid-core', () => ({
  searchCells: jest.fn(),
}));

describe('IntegratedSearching', () => {
  it('should exec searchCells with correct arguments', () => {
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <IntegratedSearching />
      </PluginHost>
    ));

    expect(searchCells).toBeCalledWith(
      defaultDeps.getter.rows,
      defaultDeps.getter.columns,
      defaultDeps.getter.getCellValue,
      "",
      expect.any(Function),
      defaultDeps.getter.isGroupRow,
      defaultDeps.getter.getRowLevelKey,
    );
  });
});
