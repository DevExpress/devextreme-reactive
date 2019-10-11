import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { PluginHost, Template } from '@devexpress/dx-react-core';
import { appointments, formatDateTimeGetter } from '@devexpress/dx-scheduler-core';
import { SchedulerCore } from './scheduler-core';

const defaultProps = {
  data: [1, 2, 3],
  rootComponent: () => null,
};

jest.mock('@devexpress/dx-scheduler-core', () => ({
  appointments: jest.fn(),
  formatDateTimeGetter: jest.fn(),
}));

describe('Scheduler Core', () => {
  beforeEach(() => {
    appointments.mockImplementation(() => [
      { startDate: '2018-07-24', endDate: '2018-07-25' },
    ]);
    formatDateTimeGetter.mockImplementation(locale => locale);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide the "appointment" getter', () => {
    const tree = mount((
      <PluginHost>
        <SchedulerCore
          {...defaultProps}
        />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));

    expect(getComputedState(tree).appointments)
      .toEqual([
        { startDate: '2018-07-24', endDate: '2018-07-25' },
      ]);
  });

  it('should provide the "formatDate" getter', () => {
    const tree = mount((
      <PluginHost>
        <SchedulerCore
          {...defaultProps}
          locale="fr-FR"
        />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));

    expect(getComputedState(tree).formatDate)
      .toEqual('fr-FR');
  });

  it('should provide the "firstDayOfWeek" getter', () => {
    const tree = mount((
      <PluginHost>
        <SchedulerCore
          firstDayOfWeek={3}
          {...defaultProps}
        />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));

    expect(getComputedState(tree).firstDayOfWeek)
      .toEqual(3);
  });

  it('should render root template', () => {
    const tree = mount((
      <PluginHost>
        <SchedulerCore
          {...defaultProps}
          rootComponent={({ children }) => (
            <div className="root">
              {children}
            </div>
          )}
        />
        <Template name="schedulerRoot">
          <div className="scheduler-root-content" />
        </Template>
        <Template name="header">
          <div className="header-content" />
        </Template>
        <Template name="body">
          <div className="body-content" />
        </Template>
        <Template name="footer">
          <div className="footer-content" />
        </Template>
      </PluginHost>
    ));

    const root = tree.find('.root');
    expect(root.exists()).toBeTruthy();
    expect(root.children().at(0).find('.scheduler-root-content').exists()).toBeTruthy();
    expect(root.children().at(1).find('.header-content').exists()).toBeTruthy();
    expect(root.children().at(2).find('.body-content').exists()).toBeTruthy();
    expect(root.children().at(3).find('.footer-content').exists()).toBeTruthy();
  });
});
