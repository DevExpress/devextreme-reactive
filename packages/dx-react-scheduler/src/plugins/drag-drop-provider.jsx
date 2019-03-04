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
  cellType,
  allDayRects,
  verticalTimeTableRects,
  horizontalTimeTableRects,
  getAppointmentStyle,
  intervalDuration,
} from '@devexpress/dx-scheduler-core';

const SCROLL_OFFSET = 50;
const SCROLL_SPEED_PX = 30;
const VERTICAL_TYPE = 'vertical';
const SECONDS = 'seconds';

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
    this.onDrop = actions => () => this.handleDrop.bind(this)(actions);
    this.onPayloadChange = actions => args => this.handlePayloadChange.bind(this)(args, actions);

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

  handlePayloadChange({ payload }, { commitChangedAppointment, stopEditAppointment }) {
    if (payload) return;
    this.setState({ payload });

    const { payload: prevPayload } = this.state;
    if (!prevPayload) return;

    stopEditAppointment({ appointmentId: prevPayload.id });
    commitChangedAppointment({ appointmentId: prevPayload.id });
    this.resetCash();
  }

  handleOver(
    { payload, clientOffset },
    {
      viewCellsData, startViewDate, endViewDate, excludedDays,
      timeTableElement, layoutElement, layoutHeaderElement,
    },
    { changeAppointment, startEditAppointment },
  ) {
    // AUTO SCROLL
    if (clientOffset) {
      const layout = layoutElement.current;
      const layoutHeaderRect = layoutHeaderElement.current.getBoundingClientRect();

      if ((clientOffset.y < layoutHeaderRect.height + layoutHeaderRect.top + SCROLL_OFFSET)
        && (clientOffset.y > layoutHeaderRect.height + layoutHeaderRect.top)) {
        layout.scrollTop -= SCROLL_SPEED_PX;
      }
      if (layout.clientHeight - SCROLL_OFFSET < clientOffset.y - layout.offsetTop) {
        layout.scrollTop += SCROLL_SPEED_PX;
      }
    }

    const timeTableCells = Array.from(timeTableElement.current.querySelectorAll('td'));
    const allDayCells = Array.from(layoutHeaderElement.current.querySelectorAll('th'));

    const timeTableIndex = cellIndex(timeTableCells, clientOffset);
    const allDayIndex = cellIndex(allDayCells, clientOffset);

    if (allDayIndex === -1 && timeTableIndex === -1) return;

    const appointmentDuration = intervalDuration(payload, SECONDS);
    const targetData = cellData(timeTableIndex, allDayIndex, viewCellsData);
    const targetType = cellType(targetData);
    const sourceType = payload.type;

    // CALCULATE INSIDE OFFSET
    let insidePart = 0;
    if (timeTableIndex !== -1) {
      const cellRect = timeTableCells[timeTableIndex].getBoundingClientRect();
      insidePart = clientOffset.y > cellRect.top + (cellRect.bottom - cellRect.top) / 2 ? 1 : 0;
    }

    // CURSOR POSITION
    const cellDuration = intervalDuration(targetData, 'minutes');
    const insideOffset = targetType === VERTICAL_TYPE ? insidePart * cellDuration * 60 / 2 : 0;

    if (this.offsetTimeTop === null) {
      this.offsetTimeTop = moment(targetData.startDate)
        .diff(payload.startDate, SECONDS) + insideOffset;
    }

    const start = moment(targetData.startDate).add(insideOffset, SECONDS);
    const end = moment(start);

    if (sourceType === targetType) {
      this.appointmentStartTime = moment(start).add((this.offsetTimeTop) * (-1), SECONDS).toDate();
      this.appointmentEndTime = moment(end)
        .add((appointmentDuration - this.offsetTimeTop), SECONDS).toDate();
    } else {
      this.appointmentStartTime = moment(targetData.startDate).add(insideOffset, SECONDS).toDate();
      this.appointmentEndTime = moment(targetData.endDate).add(insideOffset, SECONDS).toDate();
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
      if (targetType === VERTICAL_TYPE) {
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

    startEditAppointment({ appointmentId: payload.id });
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

  handleDrop({ commitChangedAppointment, stopEditAppointment }) {
    const { payload } = this.state;
    stopEditAppointment({ appointmentId: payload.id });
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
      sourceAppointmentComponent: SourceAppointment,
      allowDrag,
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
            }, {
              commitChangedAppointment, changeAppointment,
              startEditAppointment, stopEditAppointment,
            }) => (
              <DragDropProviderCore
                onChange={this.onPayloadChange({ commitChangedAppointment, stopEditAppointment })}
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
                  }, { changeAppointment, startEditAppointment, stopEditAppointment })}
                  onDrop={this.onDrop({ commitChangedAppointment, stopEditAppointment })}
                >
                  <TemplatePlaceholder />
                </DropTarget>
              </DragDropProviderCore>
            )}
          </TemplateConnector>
        </Template>

        <Template
          name="appointment"
          predicate={({ data }) => allowDrag(data)}
        >
          {params => (
            <DragSource
              payload={{ ...params.data, type: params.type }}
            >
              {payload && params.data.id === payload.id ? (
                <SourceAppointment {...params} />
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
              }, index) => (
                <DraftAppointment
                  key={index.toString()}
                  data={draftData}
                  style={getAppointmentStyle(geometry)}
                  type={type}
                />
              ))}
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
              }, index) => (
                <DraftAppointment
                  key={index.toString()}
                  data={draftData}
                  style={getAppointmentStyle(geometry)}
                  type={type}
                />
              ))}
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
  sourceAppointmentComponent: PropTypes.func.isRequired,
  allowDrag: PropTypes.func,
};

DragDropProvider.defaultProps = {
  allowDrag: () => true,
};

DragDropProvider.components = {
  containerComponent: 'Container',
  draftAppointmentComponent: 'DraftAppointment',
  sourceAppointmentComponent: 'SourceAppointment',
};
