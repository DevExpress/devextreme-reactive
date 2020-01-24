import * as React from 'react';
import { getMessagesFormatter, memoize } from '@devexpress/dx-core';
import {
  Getter,
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  PluginComponents,
} from '@devexpress/dx-react-core';
import { allDayCells, calculateAllDayDateIntervals, VERTICAL_GROUP_ORIENTATION } from '@devexpress/dx-scheduler-core';
import moment from 'moment';

import { AllDayPanelProps, AllDayPanelState } from '../types';

const pluginDependencies = [
  { name: 'DayView', optional: true },
  { name: 'WeekView', optional: true },
];
const defaultMessages = {
  allDay: 'All Day',
};
const MONTH = 'Month';
const AllDayAppointmentLayerPlaceholder = () =>
  <TemplatePlaceholder name="allDayAppointmentLayer" />;
const AllDayPanelPlaceholder = params => <TemplatePlaceholder name="allDayPanel" params={params} />;
const CellPlaceholder = params => <TemplatePlaceholder name="allDayPanelCell" params={params} />;

const GroupingPanelPlaceholder = () => <TemplatePlaceholder name="allDayGroupingPanel" />;

class AllDayPanelBase extends React.PureComponent<AllDayPanelProps, AllDayPanelState> {
  state: AllDayPanelState = {
    elementsMeta: {},
  };
  static defaultProps: Partial<AllDayPanelProps> = {
    messages: {},
  };
  static components: PluginComponents = {
    appointmentLayerComponent: 'AppointmentLayer',
    layoutComponent: 'Layout',
    layoutContainerComponent: 'LayoutContainer',
    cellComponent: 'Cell',
    rowComponent: 'Row',
    titleCellComponent: 'TitleCell',
    containerComponent: 'Container',
  };

  allDayCellsData = memoize(viewCellsData => allDayCells(viewCellsData));

  updateCellElementsMeta = memoize((cellElementsMeta) => {
    this.setState({ elementsMeta: cellElementsMeta });
  });

  allDayAppointmentsComputed = memoize(({
    appointments, startViewDate, endViewDate, excludedDays,
  }) => {
    const allDayLeftBound = moment(startViewDate).hours(0).minutes(0).toDate();
    const allDayRightBound = moment(endViewDate).hours(23).minutes(59).toDate();
    return calculateAllDayDateIntervals(
      appointments, allDayLeftBound, allDayRightBound, excludedDays,
    );
  });

  getMessageFormatter = memoize((messages, allDayPanelDefaultMessages) =>
    getMessagesFormatter({ ...allDayPanelDefaultMessages, ...messages }));

  render() {
    const {
      appointmentLayerComponent: AppointmentLayer,
      layoutComponent: Layout,
      cellComponent: Cell,
      rowComponent,
      titleCellComponent: TitleCell,
      containerComponent: Container,
      messages,
    } = this.props;
    const { elementsMeta } = this.state;
    const getMessage = this.getMessageFormatter(messages, defaultMessages);

    return (
      <Plugin
        name="AllDayPanel"
        dependencies={pluginDependencies}
      >
        <Getter name="allDayElementsMeta" value={elementsMeta} />
        <Getter
          name="allDayAppointments"
          computed={this.allDayAppointmentsComputed}
        />

        <Template name="dayScaleEmptyCell">
          <TemplateConnector>
            {({ currentView, groupOrientation }) => {
              if (currentView === MONTH) return null;
              if (groupOrientation?.(currentView.name) === VERTICAL_GROUP_ORIENTATION) {
                return (
                  <GroupingPanelPlaceholder />
                );
              }
              return (
                <TitleCell getMessage={getMessage} />
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="dayScale">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ currentView }) => {
              if (currentView === MONTH) return null;
              return (
                <Container>
                  <AllDayPanelPlaceholder />
                </Container>
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="allDayPanel">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              currentView, formatDate, viewCellsData, groups, groupOrientation,
            }) => {
              if (currentView.name === MONTH) return null;
              return (
                <>
                  <Layout
                    cellComponent={CellPlaceholder}
                    rowComponent={rowComponent}
                    cellsData={this.allDayCellsData(viewCellsData)}
                    setCellElementsMeta={this.updateCellElementsMeta}
                    formatDate={formatDate}
                    groups={
                      groupOrientation?.(currentView?.name) === VERTICAL_GROUP_ORIENTATION
                      ? groups : undefined
                    }
                  />
                  <AppointmentLayer>
                    <AllDayAppointmentLayerPlaceholder />
                  </AppointmentLayer>
                </>
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="allDayPanelCell">
          {(params: any) => <Cell {...params} />}
        </Template>
      </Plugin>
    );
  }
}

/** A plugin that renders the All Day Panel. */
export const AllDayPanel: React.ComponentType<AllDayPanelProps> = AllDayPanelBase;
