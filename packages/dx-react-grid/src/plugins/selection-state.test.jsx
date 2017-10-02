import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from './test-utils';

import { SelectionState } from './selection-state';

const defaultDeps = {
  getter: {
    rows: [],
  },
};

describe('SelectionState', () => {
  configure({ adapter: new Adapter() });
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  describe('selection', () => {
    it('should take the \'selection\' option into account', () => {
      const onSelectionChange = jest.fn();

      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <SelectionState
            defaultSelection={[]}
            onSelectionChange={onSelectionChange}
          />
        </PluginHost>,
      );

      getComputedState(tree).actions.setRowsSelection({ rowIds: [1], selected: false });

      expect(onSelectionChange)
        .toHaveBeenCalledWith([]);
    });
  });
});
