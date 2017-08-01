import React from 'react';
import { mount } from 'enzyme';

import { setupConsole } from '@devexpress/dx-testing';
import { Template, PluginHost } from '@devexpress/dx-react-core';

import { SelectionState } from './selection-state';

describe('SelectionState', () => {
  const mountPlugin = (pluginProps, templateProps) => {
    mount(
      <PluginHost>
        <SelectionState
          {...pluginProps}
        />
        <Template
          name="root"
          {...templateProps}
        >
          {() => <div />}
        </Template>
      </PluginHost>,
    );
  };
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  describe('selection', () => {
    it('should take the \'selection\' option into account', () => {
      const selection = [];
      const onSelectionChange = jest.fn();
      let setRowsSelection;

      mountPlugin({
        defaultSelection: selection,
        onSelectionChange,
      }, {
        connectActions: (action) => { setRowsSelection = action('setRowsSelection'); },
      });

      setRowsSelection({ rowIds: [1], selected: false });

      expect(selection).toHaveLength(0);
      expect(onSelectionChange).toHaveBeenCalledWith([]);
    });
  });
});
