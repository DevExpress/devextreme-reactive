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

const isMonthView = currentView => currentView.type === VIEW_TYPES.MONTH;
const isVerticalGrouping = (
  currentView, groupOrientation,
) => groupOrientation?.(currentView.name) === VERTICAL_GROUP_ORIENTATION;

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
const AllDayTitlePlaceholder = params => <TemplatePlaceholder name="allDayTitle" params={params} />;

class AllDayPanelBase extends React.PureComponent<AllDayPanelProps, AllDayPanelState> {
  state: AllDayPanelState = {
    elementsMeta: {},
    previousCell: null,
    // The key has to be generated every time the Cell component is updated to rerender the Layout
    // and, consequently, update allDayElementsMeta
    layoutKey: 0,
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

  static getDerivedStateFromProps(
    props: AllDayPanelProps, state: AllDayPanelState,
  ): AllDayPanelState | null {
    if (props.cellComponent !== state.previousCell) {
      return {
        ...state,
        previousCell: props.cellComponent,
        layoutKey: Math.random(),
      };
    }
    return null;
  }

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
      rowComponent,
      titleCellComponent: TitleCell,
      containerComponent: Container,
      messages,
    } = this.props;
    const { elementsMeta, layoutKey } = this.state;
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
                if (isMonthView(currentView)
                  || !isVerticalGrouping(currentView, groupOrientation)) {
                  return <TemplatePlaceholder params={...params} />;
                }
                return (
                  <>
                    <TemplatePlaceholder
                      params={{
                        ...params,
                        allDayCellComponent: CellPlaceholder,
                        allDayRowComponent: rowComponent,
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
              if (isMonthView(currentView) || isVerticalGrouping(currentView, groupOrientation)) {
                return <TemplatePlaceholder />;
              }

              return (
                <AllDayTitlePlaceholder />
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="timeScale">
          {(params: any) => (
            <TemplateConnector>
              {({ currentView, groupOrientation }) => {
                if (isMonthView(currentView)
                  || !isVerticalGrouping(currentView, groupOrientation)) {
                  return <TemplatePlaceholder params={...params} />;
                }

                return (
                  <TemplatePlaceholder
                    params={{
                      ...params,
                      allDayTitleComponent: AllDayTitlePlaceholder,
                      showAllDayTitle: true,
                    }}
                  />
                );
              }}
            </TemplateConnector>
          )}
        </Template>

        <Template name="dayScale">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ currentView, groupOrientation }) => {
              if (isMonthView(currentView) || isVerticalGrouping(currentView, groupOrientation)) {
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
                <React.Fragment>
                  <Layout
                    cellComponent={CellPlaceholder}
                    rowComponent={rowComponent}
                    cellsData={allDayCellsData[0]}
                    setCellElementsMeta={this.updateCellElementsMeta}
                    formatDate={formatDate}
                    key={layoutKey}
                  />
                  <AppointmentLayer>
                    <AllDayAppointmentLayerPlaceholder />
                  </AppointmentLayer>
                </React.Fragment>
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="allDayTitle">
          {(params: any) => <TitleCell getMessage={getMessage} {...params}/>}
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
