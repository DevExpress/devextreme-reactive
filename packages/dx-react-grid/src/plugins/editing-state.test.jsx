import React from 'react';
import { mount } from 'enzyme';

import { setupConsole } from '@devexpress/dx-testing';
import { Template, PluginHost } from '@devexpress/dx-react-core';

import { EditingState } from './editing-state';

describe('EditingState', () => {
  const mountPlugin = (pluginProps, templateProps) => {
    mount(
      <PluginHost>
        <EditingState
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

  describe('editing', () => {
    it('should create a row change by using a custom function', () => {
      const createRowChangeMock = jest.fn();
      const rows = [{ a: 1 }];
      const columns = [{ name: 'a' }];
      let createRowChange;

      mountPlugin({
        createRowChange: createRowChangeMock,
        onCommitChanges: () => {},
      }, {
        connectGetters: (getter) => { createRowChange = getter('createRowChange'); },
      });

      createRowChange(rows[0], columns[0].name, 3);
      expect(createRowChangeMock).toBeCalledWith(rows[0], columns[0].name, 3);
    });
  });
});
