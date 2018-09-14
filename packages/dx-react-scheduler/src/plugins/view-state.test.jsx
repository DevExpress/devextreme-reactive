import * as React from 'react';
import { setupConsole } from '@devexpress/dx-testing';
import { testStatePluginField, pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { changeCurrentDate, setCurrentView } from '@devexpress/dx-scheduler-core';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { ViewState } from './view-state';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  changeCurrentDate: jest.fn(),
  setCurrentView: jest.fn(),
}));

const defaultDeps = {};

describe('ViewState', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

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

  testStatePluginField({
    Plugin: ViewState,
    propertyName: 'currentView',
    defaultDeps,
    values: [
      'MonthView',
      'DayView',
      'AgendaView',
    ],
    actions: [{
      actionName: 'setCurrentView',
      reducer: setCurrentView,
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

  it('should provide the "currentView" getter', () => {
    const tree = mount((
      <PluginHost>
        <ViewState
          currentView="MonthView"
        />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));

    expect(getComputedState(tree).currentView)
      .toBe('MonthView');
  });
});
