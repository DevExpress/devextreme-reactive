/* globals document:true */
import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import {
  Plugin, Template, TemplatePlaceholder,
  TemplateConnector, DropTarget, DragSource,
  DragDropProvider as DragDropProviderCore,
} from '@devexpress/dx-react-core';
import {
  cellIndex,
  cellData,
  allDayRects,
  verticalTimeTableRects,
  horizontalTimeTableRects,
  getAppointmentStyle,
  intervalDuration,
} from '@devexpress/dx-scheduler-core';

const SCROLL_OFFSET = 50;
const SCROLL_SPEED_PX = 30;

const pluginDependencies = [
  { name: 'EditingState' },
  { name: 'Appointments' },
  { name: 'AllDayPanel', optional: true },
];

export class DragDropProvider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      startTime: null,
      endTime: null,
      payload: undefined,
    };

    this.resetCash = this.resetCash.bind(this);
    this.onOver = (getters, actions) => args => this.handleOver.bind(this)(args, getters, actions);
    this.onDrop = action => () => this.handleDrop.bind(this)(action);
    this.onPayloadChange = action => args => this.handlePayloadChange.bind(this)(args, action);

    this.timeTableRects = [];
    this.allDayRects = [];
    this.offsetTimeTop = null;
    this.appointmentStartTime = null;
    this.appointmentEndTime = null;
  }

  resetCash() {
    this.timeTableRects = [];
    this.allDayRects = [];
    this.offsetTimeTop = null;
    this.appointmentStartTime = null;
    this.appointmentEndTime = null;
  }

  handlePayloadChange({ payload }, commitChangedAppointment) {
    if (payload) return;
    this.setState({ payload });

    const { payload: prevPayload } = this.state;
    if (!prevPayload) return;

    commitChangedAppointment({ appointmentId: prevPayload.id });
    this.resetCash();
  }

  handleOver(
    { payload, clientOffset },
    {
      viewCellsData, startViewDate, endViewDate, excludedDays,
      timeTableElement, layoutElement, layoutHeaderElement,
    },
    { changeAppointment },
  ) {
    // AUTO SCROLL
    if (clientOffset) {
      const layout = layoutElement.current;
      const layoutHeaderRect = layoutHeaderElement.current.getBoundingClientRect();

      if ((clientOffset.y - SCROLL_OFFSET < layoutHeaderRect.height + layoutHeaderRect.top)
        && (clientOffset.y > layoutHeaderRect.height + layoutHeaderRect.top)) {
        layout.scrollTop -= SCROLL_SPEED_PX;
      }
      if (layout.clientHeight - SCROLL_OFFSET < clientOffset.y - layout.offsetTop) {
        layout.scrollTop += SCROLL_SPEED_PX;
      }
    }

    const timeTableCells = Array.from(timeTableElement.current.querySelectorAll('td'));
    const allDayCells = Array.from(document.querySelectorAll('th'));

    const timeTableIndex = cellIndex(timeTableCells, clientOffset);
    const allDayIndex = cellIndex(allDayCells, clientOffset);

    if (allDayIndex === -1 && timeTableIndex === -1) return;

    const appointmentDuration = intervalDuration(payload, 'seconds');
    const targetData = cellData(timeTableIndex, allDayIndex, viewCellsData);
    const targetType = moment(targetData.startDate).isSame(targetData.endDate, 'day')
      ? 'vertical' : 'horizontal';
    const sourceType = payload.type;

    // CALCULATE INSIDE OFFSET
    let insidePart = 0;
    if (timeTableIndex !== -1) {
      const cellRect = timeTableCells[timeTableIndex].getBoundingClientRect();
      insidePart = clientOffset.y > cellRect.top + (cellRect.bottom - cellRect.top) / 2 ? 1 : 0;
    }

    // CURSOR POSITION
    const cellDuration = intervalDuration(targetData, 'minutes');
    const insideOffset = targetType === 'vertical' ? insidePart * cellDuration * 60 / 2 : 0;

    if (this.offsetTimeTop === null) {
      this.offsetTimeTop = moment(targetData.startDate).diff(payload.startDate, 'seconds') + insideOffset;
    }

    const start = moment(targetData.startDate).add(insideOffset, 'seconds');
    const end = moment(start);

    if (sourceType === targetType) {
      this.appointmentStartTime = moment(start).add((this.offsetTimeTop) * (-1), 'seconds').toDate();
      this.appointmentEndTime = moment(end).add((appointmentDuration - this.offsetTimeTop), 'seconds').toDate();
    } else {
      this.appointmentStartTime = moment(targetData.startDate).add(insideOffset, 'seconds');
      this.appointmentEndTime = moment(targetData.endDate).add(insideOffset, 'seconds');
    }

    const draftAppointments = [{
      ...payload, start: this.appointmentStartTime, end: this.appointmentEndTime,
    }];

    if (allDayIndex !== -1) {
      this.allDayRects = allDayRects(
        draftAppointments, startViewDate, endViewDate, excludedDays, viewCellsData, allDayCells,
      );
    } else {
      this.allDayRects = [];
    }

    if (timeTableIndex !== -1 && allDayIndex === -1) {
      if (targetType === 'vertical') {
        this.timeTableRects = verticalTimeTableRects(
          draftAppointments, startViewDate, endViewDate,
          excludedDays, viewCellsData, cellDuration, timeTableCells,
        );
      } else {
        this.timeTableRects = horizontalTimeTableRects(
          draftAppointments, startViewDate, endViewDate,
          excludedDays, viewCellsData, timeTableCells,
        );
      }
    } else {
      this.timeTableRects = [];
    }

    const { startTime, endTime } = this.state;
    if (moment(startTime).isSame(this.appointmentStartTime)
      && moment(endTime).isSame(this.appointmentEndTime)) return;

    changeAppointment({
      change: {
        startDate: this.appointmentStartTime,
        endDate: this.appointmentEndTime,
      },
    });

    this.setState({
      startTime: this.appointmentStartTime,
      endTime: this.appointmentEndTime,
      payload,
    });
  }

  handleDrop(commitChangedAppointment) {
    const { payload } = this.state;
    commitChangedAppointment({ appointmentId: payload.id });
    this.resetCash();

    this.setState({
      payload: undefined,
      startTime: null,
      endTime: null,
    });
  }

  render() {
    const { payload } = this.state;
    const {
      containerComponent: Container,
      draftAppointmentComponent: DraftAppointment,
      draggingAppointmentComponent: DraggingAppointment,
      draggingPredicate,
    } = this.props;

    const draftData = {
      ...payload, startDate: this.appointmentStartTime, endDate: this.appointmentEndTime,
    };

    return (
      <Plugin
        name="DragDropProvider"
        dependencies={pluginDependencies}
      >
        <Template name="body">
          <TemplateConnector>
            {({
              viewCellsData, startViewDate, endViewDate, excludedDays,
              timeTableElement, layoutElement, layoutHeaderElement,
            }, { commitChangedAppointment, changeAppointment }) => (
              <DragDropProviderCore
                onChange={this.onPayloadChange(commitChangedAppointment)}
              >
                <DropTarget
                  onOver={this.onOver({
                    viewCellsData,
                    startViewDate,
                    endViewDate,
                    excludedDays,
                    timeTableElement,
                    layoutElement,
                    layoutHeaderElement,
                  }, { changeAppointment })}
                  onDrop={this.onDrop(commitChangedAppointment)}
                >
                  <TemplatePlaceholder />
                </DropTarget>
              </DragDropProviderCore>
            )}
          </TemplateConnector>
        </Template>

        <Template
          name="appointment"
          predicate={({ data }) => draggingPredicate(data)}
        >
          {params => (
            <DragSource
              payload={{ ...params.data, type: params.type }}
            >
              {payload && params.data.id === payload.id ? (
                <DraggingAppointment {...params} />
              ) : (
                <TemplatePlaceholder params={{ ...params, style: { ...params.style, cursor: 'pointer' } }} />
              )}
            </DragSource>
          )}
        </Template>

        <Template name="allDayPanel">
          <TemplatePlaceholder />
          {(this.allDayRects.length > 0 ? (
            <Container>
              {this.allDayRects.map(({
                dataItem, type, ...geometry
              }, index) => {
                return (
                  <DraftAppointment
                    key={index.toString()}
                    data={draftData}
                    style={getAppointmentStyle(geometry)}
                    type={type}
                  />
                );
              })}
            </Container>
          ) : (
            null
          ))}
        </Template>

        <Template name="main">
          <TemplatePlaceholder />
          {(this.timeTableRects.length > 0 ? (
            <Container>
              {this.timeTableRects.map(({
                dataItem, type, ...geometry
              }, index) => {
                return (
                  <DraftAppointment
                    key={index.toString()}
                    data={draftData}
                    style={getAppointmentStyle(geometry)}
                    type={type}
                  />
                );
              })}
            </Container>
          ) : (
            null
          ))}
        </Template>
      </Plugin>
    );
  }
}

DragDropProvider.propTypes = {
  containerComponent: PropTypes.func.isRequired,
  draftAppointmentComponent: PropTypes.func.isRequired,
  draggingAppointmentComponent: PropTypes.func.isRequired,
  draggingPredicate: PropTypes.func,
};

DragDropProvider.defaultProps = {
  draggingPredicate: () => true,
};

DragDropProvider.components = {
  containerComponent: 'Container',
  draftAppointmentComponent: 'DraftAppointment',
  draggingAppointmentComponent: 'DraggingAppointment',
};
