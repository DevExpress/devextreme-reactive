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
import {
  allDayCells, calculateAllDayDateIntervals,
  VERTICAL_GROUP_ORIENTATION, VIEW_TYPES,
} from '@devexpress/dx-scheduler-core';
import moment from 'moment';

import { AllDayPanelProps, AllDayPanelState } from '../types';

const pluginDependencies = [
  { name: 'DayView', optional: true },
  { name: 'WeekView', optional: true },
];
const defaultMessages = {
  allDay: 'All Day',
};
const AllDayAppointmentLayerPlaceholder = () =>
  <TemplatePlaceholder name="allDayAppointmentLayer" />;
const AllDayPanelPlaceholder = params => <TemplatePlaceholder name="allDayPanel" params={params} />;
const CellPlaceholder = params => <TemplatePlaceholder name="allDayPanelCell" params={params} />;
const RowPlaceholder = params => <TemplatePlaceholder name="allDayPanelRow" params={params} />;
const AllDayTitlePlaceholder = params => <TemplatePlaceholder name="allDayTitle" params={params} />

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

  allDayCellsDataComputed = memoize(({ viewCellsData }) => allDayCells(viewCellsData));

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

  allDayPanelExistsComputed = memoize(({
    currentView,
  }) => currentView.type !== VIEW_TYPES.MONTH);

  getMessageFormatter = memoize((messages, allDayPanelDefaultMessages) =>
    getMessagesFormatter({ ...allDayPanelDefaultMessages, ...messages }));

  render() {
    const {
      appointmentLayerComponent: AppointmentLayer,
      layoutComponent: Layout,
      cellComponent: Cell,
      rowComponent: Row,
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
        <Getter name="allDayCellsData" computed={this.allDayCellsDataComputed} />
        <Getter name="allDayPanelExists" computed={this.allDayPanelExistsComputed} />
        <Getter
          name="allDayAppointments"
          computed={this.allDayAppointmentsComputed}
        />

        <Template name="timeTable">
          {(params: any) => (
            <TemplateConnector>
              {({ currentView, groupOrientation, allDayCellsData }) => {
                if (currentView.type === VIEW_TYPES.MONTH
                    || groupOrientation?.(currentView.name) !== VERTICAL_GROUP_ORIENTATION) {
                  return <TemplatePlaceholder params={...params} />;
                }

                return (
                  <>
                    <TemplatePlaceholder
                      params={{
                        ...params,
                        allDayCellComponent: CellPlaceholder,
                        allDayRowComponent: RowPlaceholder,
                        allDayCellsData,
                      }}
                    />
                    <AppointmentLayer>
                      <AllDayAppointmentLayerPlaceholder />
                    </AppointmentLayer>
                  </>
                );
              }}
            </TemplateConnector>
          )}
        </Template>

        <Template name="dayScaleEmptyCell">
          <TemplateConnector>
            {({ currentView, groupOrientation }) => {
              if (currentView.type === VIEW_TYPES.MONTH
                  || groupOrientation?.(currentView.name) === VERTICAL_GROUP_ORIENTATION) {
                return <TemplatePlaceholder />;
              }

              return (
                <AllDayTitlePlaceholder />
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="dayScale">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ currentView, groupOrientation }) => {
              if (currentView.type === VIEW_TYPES.MONTH
                  || groupOrientation?.(currentView.name) === VERTICAL_GROUP_ORIENTATION) {
                return null;
              }

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
              currentView, formatDate, allDayCellsData,
            }) => {
              if (currentView.type === VIEW_TYPES.MONTH) return null;

              return (
                <>
                  <Layout
                    cellComponent={CellPlaceholder}
                    rowComponent={RowPlaceholder}
                    cellsData={allDayCellsData[0]}
                    setCellElementsMeta={this.updateCellElementsMeta}
                    formatDate={formatDate}
                  />
                  <AppointmentLayer>
                    <AllDayAppointmentLayerPlaceholder />
                  </AppointmentLayer>
                </>
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="allDayTitle">
          {(params: any) => <TitleCell getMessage={getMessage} {...params}/>}
        </Template>
        <Template name="allDayPanelRow">
          {(params: any) => <Row {...params} />}
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
