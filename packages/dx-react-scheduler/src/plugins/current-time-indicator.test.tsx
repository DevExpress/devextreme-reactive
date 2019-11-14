import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { CurrentTimeIndicator } from './current-time-indicator';
import {
  isMonthCell, isCellShaded, isAllDayCellShaded, isReducedBrightnessAppointment,
} from '@devexpress/dx-scheduler-core';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...require.requireActual('@devexpress/dx-scheduler-core'),
  isMonthCell: jest.fn(),
  isCellShaded: jest.fn(),
  isAllDayCellShaded: jest.fn(),
  isReducedBrightnessAppointment: jest.fn(),
}));

describe('TodayButton', () => {
  const defaultProps = {
    indicatorComponent: () => null,
  };
  const defaultDeps = {
    template: {
      cell: { startDate: new Date(2019, 10, 10, 10, 10), endDate: new Date(2019, 10, 10, 11, 10) },
      allDayPanelCell: {
        startDate: new Date(2019, 10, 10, 0, 0),
        endDate: new Date(2019, 10, 11, 0, 0),
      },
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

      expect(firstCellTemplate.props().children().props.params.currentTime)
        .toEqual(expect.any(Date));
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
    });

    it('should render allDayPanelCell template', () => {
      isAllDayCellShaded.mockImplementation(() => false);
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <CurrentTimeIndicator
            {...defaultProps}
          />
        </PluginHost>
      ));

      const cellTemplate = tree
        .find('TemplateBase')
        .filterWhere(node => node.props().name === 'allDayPanelCell')
        .first();

      expect(cellTemplate.props().children().props.params.isShaded)
        .toBe(false);

      expect(isAllDayCellShaded)
        .toBeCalledWith(undefined, expect.any(Number), false);
    });

    it('should render appointmentContent template', () => {
      isReducedBrightnessAppointment.mockImplementation(() => false);
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

      expect(appointmentContentTemplate.props().children().props.params.isBrightnessReduced)
        .toBe(false);

      expect(isReducedBrightnessAppointment)
        .toBeCalledWith(undefined, expect.any(Number), false);
    });

    it('should render draftAppointment template', () => {
      isReducedBrightnessAppointment.mockImplementation(() => false);
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

      expect(draftAppointmentTemplate.props().children().props.params.isBrightnessReduced)
        .toBe(false);

      expect(isReducedBrightnessAppointment)
        .toBeCalledWith(undefined, expect.any(Number), false);
    });
  });

  describe('Properties', () => {
    it('should call isCellShaded and isAllDayCellShaded with default shadePastCells prop', () => {
      mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <CurrentTimeIndicator
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(isCellShaded)
        .toBeCalledWith(expect.anything(), expect.anything(), false);
      expect(isAllDayCellShaded)
        .toBeCalledWith(expect.anything(), expect.anything(), false);
    });

    it('should call isCellShaded and isAllDayCellShaded with user\'s shadePastCells prop', () => {
      mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <CurrentTimeIndicator
            {...defaultProps}
            shadePastCells
          />
        </PluginHost>
      ));

      expect(isCellShaded)
        .toBeCalledWith(expect.anything(), expect.anything(), true);
      expect(isAllDayCellShaded)
        .toBeCalledWith(expect.anything(), expect.anything(), true);
    });

    it('should call isReducedBrightnessAppointment with default reduceBrightnessOfPastAppointments prop', () => {
      mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <CurrentTimeIndicator
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(isReducedBrightnessAppointment)
        .toBeCalledWith(expect.anything(), expect.anything(), false);
    });

    it('should call isReducedBrightnessAppointment with user\'s reduceBrightnessOfPastAppointments prop', () => {
      mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <CurrentTimeIndicator
            {...defaultProps}
            reduceBrightnessOfPastAppointments
          />
        </PluginHost>
      ));

      expect(isReducedBrightnessAppointment)
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
});
