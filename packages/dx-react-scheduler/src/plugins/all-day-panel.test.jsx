import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  allDayAppointmentsRects,
  // getMessagesFormatter,
} from '@devexpress/dx-scheduler-core';
import { AllDayPanel } from './all-day-panel';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  allDayAppointmentsRects: jest.fn(),
  getMessagesFormatter: jest.fn(),
}));

const defaultDeps = {
  getter: {
    currentDate: '2018-07-04',
    dateTableRef: {
      querySelectorAll: () => {},
    },
    currentView: 'week',
    startViewDate: '',
    endViewDate: '',
    excludedDays: [],
  },
  template: {
    body: {},
    navbar: {},
    sidebar: {},
    main: {},
    navbarEmpty: {},
  },
};

const defaultProps = {
  messages: {},
  cellComponent: () => null,
  rowComponent: () => null,
  textComponent: () => null,
  // eslint-disable-next-line react/prop-types, react/jsx-one-expression-per-line
  containerComponent: ({ children }) => <div className="container">{children}</div>,
  // eslint-disable-next-line react/prop-types, react/jsx-one-expression-per-line
  layoutComponent: ({ children }) => <div className="layout">{children}</div>,
};

describe('AllDayPanel', () => {
  beforeEach(() => {
    allDayAppointmentsRects.mockImplementation(() => [{
      dataItem: {}, type: 'h', top: 0, left: 0,
    }]);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Templates', () => {
    it('should render AllDayPanel layout', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <AllDayPanel
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(tree.find('.layout').exists())
        .toBeTruthy();
    });

    it('should render day panel', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <AllDayPanel
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(tree.find('.layout').exists())
        .toBeTruthy();
    });

    it('should appointment container', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <AllDayPanel
            {...defaultProps}
          />
        </PluginHost>
      ));

      tree.setState({ tableRef: true });

      expect(tree.find('.container').exists())
        .toBeTruthy();
    });
  });
});
