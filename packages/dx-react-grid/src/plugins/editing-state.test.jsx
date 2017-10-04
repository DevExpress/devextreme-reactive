import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState } from './test-utils';

import { EditingState } from './editing-state';

const defaultDeps = {};

describe('EditingState', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  describe('editing', () => {
    it('should create a row change by using a custom function', () => {
      const createRowChangeMock = jest.fn();
      const row = { a: 1 };
      const column = { name: 'a' };

      const tree = mount(
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <EditingState
            createRowChange={createRowChangeMock}
            onCommitChanges={() => {}}
          />
        </PluginHost>,
      );

      getComputedState(tree).getters.createRowChange(row, column.name, 3);

      expect(createRowChangeMock)
        .toBeCalledWith(row, column.name, 3);
    });
  });
});
