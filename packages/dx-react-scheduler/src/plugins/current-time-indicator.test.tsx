import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { CurrentTimeIndicator } from './current-time-indicator';
import {
  isMonthCell, isCellShaded, isShadedAppointment, getCurrentTimeIndicatorTop,
} from '@devexpress/dx-scheduler-core';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...jest.requireActual('@devexpress/dx-scheduler-core'),
  isMonthCell: jest.fn(),
  isCellShaded: jest.fn(),
  isShadedAppointment: jest.fn(),
  getCurrentTimeIndicatorTop: jest.fn(),
}));

describe('CurrentTimeIndicator', () => {
  const defaultProps = {
    indicatorComponent: () => null,
    shadePreviousAppointments: undefined,
    shadePreviousCells: undefined,
    updateInterval: undefined,
  };
  const defaultDeps = {
    template: {
      cell: { startDate: new Date(2019, 10, 10, 10, 10), endDate: new Date(2019, 10, 10, 11, 10) },
      appointmentContent: { data: {
        startDate: new Date(2019, 10, 10, 10, 10),
        endDate: new Date(2019, 10, 10, 11, 10),
      }},
      draftAppointment: { data: {
        startDate: new Date(2019, 10, 10, 10, 10),
        endDate: new Date(2019, 10, 10, 11, 10),
      }},
    },
    plugins: ['WeekView', 'DragDropProvider', 'AllDayPanel'],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Templates', () => {
    it('should render cell templates', () => {
      isMonthCell.mockImplementation(() => false);
      isCellShaded.mockImplementation(() => false);
      getCurrentTimeIndicatorTop.mockImplementation(() => 'getCurrentTimeIndicatorTop');
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <CurrentTimeIndicator
            {...defaultProps}
          />
        </PluginHost>
      ));

      const firstCellTemplate = tree
        .find('TemplateBase')
        .filterWhere(node => node.props().name === 'cell')
        .first();

      expect(firstCellTemplate.props().children().props.params.currentTimeIndicatorPosition)
        .toBe('getCurrentTimeIndicatorTop');
      expect(firstCellTemplate.props().children().props.params.currentTimeIndicatorComponent)
        .toEqual(defaultProps.indicatorComponent);

      const secondCellTemplate = tree
        .find('TemplateBase')
        .filterWhere(node => node.props().name === 'cell')
        .last();

      expect(secondCellTemplate.props().children().props.params.isShaded)
        .toBe(false);

      expect(isMonthCell)
        .toBeCalledWith(undefined);
      expect(isCellShaded)
        .toBeCalledWith(undefined, expect.any(Number), false);
      expect(getCurrentTimeIndicatorTop)
        .toBeCalledWith({
          startDate: defaultDeps.template.cell.startDate,
          endDate: defaultDeps.template.cell.endDate,
          isShaded: expect.any(Boolean),
        }, expect.any(Number));
    });

    it('should render appointmentContent template', () => {
      isShadedAppointment.mockImplementation(() => false);
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <CurrentTimeIndicator
            {...defaultProps}
          />
        </PluginHost>
      ));

      const appointmentContentTemplate = tree
        .find('TemplateBase')
        .filterWhere(node => node.props().name === 'appointmentContent')
        .first();

      expect(appointmentContentTemplate.props().children().props.params.isShaded)
        .toBe(false);

      expect(isShadedAppointment)
        .toBeCalledWith(undefined, expect.any(Number), false);
    });

    it('should render draftAppointment template', () => {
      isShadedAppointment.mockImplementation(() => false);
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <CurrentTimeIndicator
            {...defaultProps}
          />
        </PluginHost>
      ));

      const draftAppointmentTemplate = tree
        .find('TemplateBase')
        .filterWhere(node => node.props().name === 'draftAppointment')
        .first();

      expect(draftAppointmentTemplate.props().children().props.params.isShaded)
        .toBe(false);

      expect(isShadedAppointment)
        .toBeCalledWith(undefined, expect.any(Number), false);
    });
  });

  describe('Properties', () => {
    it('should call isShadedAppointment with default shadePreviousAppointments prop', () => {
      mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <CurrentTimeIndicator
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(isShadedAppointment)
        .toBeCalledWith(expect.anything(), expect.anything(), false);
    });

    it('should call isShadedAppointment with user\'s shadePreviousAppointments prop', () => {
      mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <CurrentTimeIndicator
            {...defaultProps}
            shadePreviousAppointments
          />
        </PluginHost>
      ));

      expect(isShadedAppointment)
        .toBeCalledWith(expect.anything(), expect.anything(), true);
    });

    it('should use default updateInterval prop', () => {
      jest.useFakeTimers();
      mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <CurrentTimeIndicator
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(setInterval)
        .toBeCalledWith(expect.any(Function), 60000);
    });

    it('should not call the inner setInterval with null updateInterval prop value', () => {
      const userUpdateInterval = null;
      mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <CurrentTimeIndicator
            {...defaultProps}
            updateInterval={userUpdateInterval}
          />
        </PluginHost>
      ));

      expect(setInterval)
        .not
        .toBeCalled();
    });

    it('should not call the inner setInterval with 0 updateInterval prop value', () => {
      const userUpdateInterval = 0;
      mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <CurrentTimeIndicator
            {...defaultProps}
            updateInterval={userUpdateInterval}
          />
        </PluginHost>
      ));

      expect(setInterval)
        .not
        .toBeCalled();
    });

    it('should use user provided updateInterval prop', () => {
      const userUpdateInterval = 10000;
      mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <CurrentTimeIndicator
            {...defaultProps}
            updateInterval={userUpdateInterval}
          />
        </PluginHost>
      ));

      expect(setInterval)
        .toBeCalledWith(expect.any(Function), userUpdateInterval);
    });
  });

  describe('Unmount', () => {
    it('should call the inner useEffect unmount handler', () => {
      const wrapper = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <CurrentTimeIndicator
            {...defaultProps}
          />
        </PluginHost>
      ));

      wrapper.unmount();

      expect(clearInterval)
        .toBeCalledWith(expect.any(Number));
    });
  });
});
