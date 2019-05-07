import * as React from 'react';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
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

class AllDayPanelBase extends React.PureComponent<AllDayPanelProps, AllDayPanelState> {
  static components = {
    appointmentLayerComponent: 'AppointmentLayer',
    layoutComponent: 'Layout',
    cellComponent: 'Cell',
    rowComponent: 'Row',
    titleCellComponent: 'TitleCell',
    containerComponent: 'Container',
  };
  static defaultProps = {
    messages: {},
  };
  appointmentPlaceholder: any;
  cellPlaceholder: any;
  allDayPanelPlaceholder: any;

  constructor(props) {
    super(props);

    this.state = {
      tableRef: null,
    };
    this.allDayPanelRef = this.allDayPanelRef.bind(this);

    this.appointmentPlaceholder = params => <TemplatePlaceholder name="appointment" params={params} />;
    this.cellPlaceholder = params => <TemplatePlaceholder name="allDayPanelCell" params={params} />;
    this.allDayPanelPlaceholder = params => <TemplatePlaceholder name="allDayPanel" params={params} />;
  }

  allDayPanelRef(ref) {
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
    const { allDayPanelPlaceholder: AllDayPanelPlaceholder } = this;

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

        <Template name="navbar">
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
              const rects = tableRef && tableRef.querySelectorAll('th').length === viewCellsData[0].length ? calculateRectByDateIntervals(
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
              const { appointmentPlaceholder: AppointmentPlaceholder } = this;
              return (
                <React.Fragment>
                  <Layout
                    allDayPanelRef={this.allDayPanelRef}
                    cellComponent={this.cellPlaceholder}
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

export const AllDayPanel: React.ComponentType<AllDayPanelProps> = AllDayPanelBase;
