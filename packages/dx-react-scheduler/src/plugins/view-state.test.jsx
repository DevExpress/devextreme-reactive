import * as React from 'react';
import { testStatePluginField, pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { changeCurrentDate } from '@devexpress/dx-scheduler-core';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { ViewState } from './view-state';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  changeCurrentDate: jest.fn(),
}));

const defaultDeps = {};

describe('ViewState', () => {
  testStatePluginField({
    Plugin: ViewState,
    propertyName: 'currentDate',
    defaultDeps,
    values: [
      '2018-07-13',
      '2018-07-14',
      '2018-07-15',
    ],
    actions: [{
      actionName: 'changeCurrentDate',
      reducer: changeCurrentDate,
    }],
  });

  it('should provide the "currentDate" getter', () => {
    const tree = mount((
      <PluginHost>
        <ViewState
          currentDate="2018-07-13"
        />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));

    expect(getComputedState(tree).currentDate)
      .toBe('2018-07-13');
  });
});
