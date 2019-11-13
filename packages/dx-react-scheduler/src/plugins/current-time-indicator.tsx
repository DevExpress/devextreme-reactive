import * as React from 'react';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
  PluginComponents,
} from '@devexpress/dx-react-core';
import { CurrentTimeIndicatorProps, CurrentTimeIndicatorState } from '../types';
import { isMonthCell, isPastAppointment } from '@devexpress/dx-scheduler-core/src';

const pluginDependencies = [];

const BASE_INTERVAL = 60000;

class CurrentTimeIndicatorBase extends React.PureComponent<
  CurrentTimeIndicatorProps, CurrentTimeIndicatorState
> {
  static components: PluginComponents = {
    indicatorComponent: 'Indicator',
  };
  indicatorUpdateTimer;

  constructor(props) {
    super(props);
    this.state = { currentTime: Date.now() };
  }

  componentDidMount() {
    this.setIndicatorUpdateTimer();
  }

  componentDidUpdate() {
    clearTimeout(this.indicatorUpdateTimer);
    this.setIndicatorUpdateTimer();
  }

  setIndicatorUpdateTimer() {
    this.indicatorUpdateTimer = setTimeout(
      () => this.setState({
        currentTime: Date.now(),
      }),
      this.props.updateInterval || BASE_INTERVAL,
    );
  }

  componentWillUnmount() {
    clearTimeout(this.indicatorUpdateTimer);
  }

  render() {
    const { currentTime } = this.state;
    const { indicatorComponent, reduceBrightnessOfPastAppointments, shadePastCells } = this.props;
    return (
      <Plugin
        name="CurrentTimeIndicator"
        dependencies={pluginDependencies}
      >
        <Template
          name="cell"
          predicate={({ otherMonth }: any) => !isMonthCell(otherMonth)}
        >
          {params => (
            <TemplatePlaceholder
              params={{
                ...params,
                currentTime: new Date(currentTime),
                currentTimeIndicatorComponent: indicatorComponent,
              }}
            />
          )}
        </Template>
        <Template
          name="cell"
        >
          {({ startDate, ...restParams }: any) => (
            <TemplatePlaceholder
              params={{
                ...restParams,
                startDate,
                isShaded: startDate.getTime() < currentTime && shadePastCells,
              }}
            />
          )}
        </Template>
        <Template
          name="appointmentContent"
        >
          {({ data, ...restParams }: any) => {
            return (
              <TemplatePlaceholder
                params={{
                  ...restParams,
                  data,
                  isBrightnessReduced: isPastAppointment(data, currentTime)
                    && reduceBrightnessOfPastAppointments,
                }}
              />
            );
          }}
        </Template>
        <Template
          name="draftAppointment"
        >
          {({ data, ...restParams }: any) => {
            return (
              <TemplatePlaceholder
                params={{
                  ...restParams,
                  data,
                  isBrightnessReduced: isPastAppointment(data, currentTime)
                    && reduceBrightnessOfPastAppointments,
                }}
              />
            );
          }}
        </Template>
      </Plugin>
    );
  }
}

/** A plugin that renders the Scheduler's button which sets the current date to today's date. */
export const CurrentTimeIndicator: React.ComponentType<
  CurrentTimeIndicatorProps
> = CurrentTimeIndicatorBase;
