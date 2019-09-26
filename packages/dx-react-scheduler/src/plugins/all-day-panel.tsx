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
  allDayCells,
  getAppointmentStyle,
  allDayRects,
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
const MONTH = 'Month';
const AppointmentPlaceholder = params => <TemplatePlaceholder name="appointment" params={params} />;
const AllDayPanelPlaceholder = params => <TemplatePlaceholder name="allDayPanel" params={params} />;
const CellPlaceholder = params => <TemplatePlaceholder name="allDayPanelCell" params={params} />;

class AllDayPanelBase extends React.PureComponent<AllDayPanelProps, AllDayPanelState> {
  state: AllDayPanelState = {
    rects: [],
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

  updateRects = memoize((
    appointments, startViewDate, excludedDays, endViewDate, viewCellsData,
  ) => (cellElementsMeta) => {
    const allDayLeftBound = moment(startViewDate).hours(0).minutes(0).toDate();
    const allDayRightBound = moment(endViewDate).hours(23).minutes(59).toDate();
    const rects = allDayRects(
      appointments, allDayLeftBound, allDayRightBound,
      excludedDays, viewCellsData, cellElementsMeta,
    );

    this.setState({ rects, elementsMeta: cellElementsMeta });
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
    const { rects, elementsMeta } = this.state;
    const getMessage = this.getMessageFormatter(messages, defaultMessages);

    return (
      <Plugin
        name="AllDayPanel"
        dependencies={pluginDependencies}
      >
        <Getter name="allDayElementsMeta" value={elementsMeta} />

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
              currentView, appointments, startViewDate, formatDate,
              endViewDate, excludedDays, viewCellsData,
            }) => {
              if (currentView.name === MONTH) return null;
              const setRects = this.updateRects(
                appointments, startViewDate, excludedDays, endViewDate, viewCellsData,
              );
              return (
                <>
                  <Layout
                    cellComponent={CellPlaceholder}
                    rowComponent={rowComponent}
                    cellsData={this.allDayCellsData(viewCellsData)}
                    setCellElementsMeta={setRects}
                    formatDate={formatDate}
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
