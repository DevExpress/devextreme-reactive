import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { PluginHost, Template } from '@devexpress/dx-react-core';
import { SchedulerCore } from './scheduler-core';

const defaultProps = {
  data: [1, 2, 3],
  currentDate: '2018-07-04',
  rootComponent: () => null,
};

describe('Scheduler Core', () => {
  it('should provide the "data" getter', () => {
    const tree = mount((
      <PluginHost>
        <SchedulerCore
          {...defaultProps}
        />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));

    expect(getComputedState(tree).data)
      .toBe(defaultProps.data);
  });

  it('should provide the "currentDate" getter', () => {
    const tree = mount((
      <PluginHost>
        <SchedulerCore
          {...defaultProps}
        />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));

    expect(getComputedState(tree).currentDate)
      .toBe(defaultProps.currentDate);
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
        <Template name="header"><div className="header-content" /></Template>
        <Template name="body"><div className="body-content" /></Template>
        <Template name="footer"><div className="footer-content" /></Template>
      </PluginHost>
    ));

    const root = tree.find('.root');
    expect(root.exists()).toBeTruthy();
    expect(root.children().at(0).find('.header-content').exists()).toBeTruthy();
    expect(root.children().at(1).find('.body-content').exists()).toBeTruthy();
    expect(root.children().at(2).find('.footer-content').exists()).toBeTruthy();
  });
});
