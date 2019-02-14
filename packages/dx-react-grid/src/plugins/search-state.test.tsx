import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { changeSearchValue } from '@devexpress/dx-grid-core';
import {
  pluginDepsToComponents, getComputedState, testStatePluginField,
} from '@devexpress/dx-testing';
import { SearchState } from './search-state';

jest.mock('@devexpress/dx-grid-core', () => ({
  changeSearchValue: jest.fn(),
  searchFilterExpression: jest.fn().mockReturnValue('filters'),
}));

const defaultDeps = {
  getter: {
    rows: [{ id: 1 }],
    columns: [{ name: 'a' }, { name: 'b' }],
  },
};

describe('Search state', () => {
  beforeEach(() => {
    changeSearchValue.mockImplementation(() => []);
  });

  testStatePluginField({
    defaultDeps,
    Plugin: SearchState,
    propertyName: 'value',
    getterName: 'searchValue',
    values: [
      'searchValue',
      'searchValue2',
      'searchValue3',
    ],
    actions: [{
      actionName: 'changeSearchValue',
      reducer: changeSearchValue,
    }],
  });

  it('should provide filter expressions', () => {
    const value = 'abc';

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <SearchState
          value={value}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).filterExpression).toBe('filters');
  });
});
