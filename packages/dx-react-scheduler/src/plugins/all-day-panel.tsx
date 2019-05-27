import * as React from 'react';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  PluginComponents,
} from '@devexpress/dx-react-core';
import {
  allDayCells,
  getAppointmentStyle,
  calculateRectByDateIntervals,
  calculateAllDayDateIntervals,
  getHorizontalRectByDates,
  HORIZONTAL_TYPE,
  AllDayCell,
} from '@devexpress/dx-scheduler-core';

import { AllDayPanelProps, AllDayPanelState } from '../types';

const pluginDependencies = [
  { name: 'DayView', optional: true },
  { name: 'WeekView', optional: true },
];
const defaultMessages = {
  allDay: 'All Day',
};
const MONTH = 'Month';
const AppointmentPlaceholder = params => <TemplatePlaceholder name="appointment" params={params} />;
const AllDayPanelPlaceholder = params => <TemplatePlaceholder name="allDayPanel" params={params} />;
const CellPlaceholder = params => <TemplatePlaceholder name="allDayPanelCell" params={params} />;

class AllDayPanelBase extends React.PureComponent<AllDayPanelProps, AllDayPanelState> {
  state: AllDayPanelState = {
    tableRef: null,
  };
  static defaultProps: Partial<AllDayPanelProps> = {
    messages: {},
  };
  static components: PluginComponents = {
    appointmentLayerComponent: 'AppointmentLayer',
    layoutComponent: 'Layout',
    cellComponent: 'Cell',
    rowComponent: 'Row',
    titleCellComponent: 'TitleCell',
    containerComponent: 'Container',
  };

  allDayPanelRef = (ref) => {
    this.setState({
      tableRef: ref,
    });
  }

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
    const { tableRef } = this.state;
    const getMessage = getMessagesFormatter({ ...defaultMessages, ...messages });

    return (
      <Plugin
        name="AllDayPanel"
        dependencies={pluginDependencies}
      >
        <Template name="dayScaleEmptyCell">
          <TemplateConnector>
            {({ currentView }) => {
              if (currentView === MONTH) return null;
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
              currentView, appointments, startViewDate,
              endViewDate, excludedDays, viewCellsData,
            }) => {
              if (currentView.name === MONTH) return null;
              const intervals = calculateAllDayDateIntervals(
                appointments, startViewDate, endViewDate, excludedDays,
              );
              const rects = tableRef
                && tableRef.querySelectorAll('th').length === viewCellsData[0].length
                ? calculateRectByDateIntervals(
                  {
                    growDirection: HORIZONTAL_TYPE,
                    multiline: false,
                  },
                  intervals,
                  getHorizontalRectByDates,
                  {
                    startViewDate,
                    endViewDate,
                    excludedDays,
                    viewCellsData,
                    cellElements: tableRef.querySelectorAll('th'),
                  },
                ) : [];
              return (
                <React.Fragment>
                  <Layout
                    allDayPanelRef={this.allDayPanelRef}
                    cellComponent={CellPlaceholder}
                    rowComponent={Row}
                    cellsData={allDayCells(viewCellsData) as AllDayCell[]}
                  />
                  <AppointmentLayer>
                    {rects.map(({
                      dataItem, type, fromPrev, toNext, ...geometry
                    }, index) => (
                      <AppointmentPlaceholder
                        style={getAppointmentStyle(geometry)}
                        type={type}
                        key={index.toString()}
                        data={dataItem}
                        fromPrev={fromPrev}
                        toNext={toNext}
                      />
                    ))}
                  </AppointmentLayer>
                </React.Fragment>
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
