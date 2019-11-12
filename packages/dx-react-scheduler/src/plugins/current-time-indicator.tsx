import * as React from 'react';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
  PluginComponents,
  Getter,
} from '@devexpress/dx-react-core';
import { memoize } from '@devexpress/dx-core';
import { TodayButtonProps } from '../types';

const pluginDependencies = [];

const BASE_INTERVAL = 60000;

class CurrentTimeIndicatorBase extends React.PureComponent {
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

  viewCellsDataComputed = memoize(currentTime => ({ viewCellsData }) => {
    // console.log(viewCellsData)
    return viewCellsData.map((rowCellData) => {
      return rowCellData.map((cellData) => {
        return cellData.startDate.getTime() <= currentTime
          && cellData.endDate.getTime() >= currentTime
          ? { ...cellData, isNow: true }
          : cellData;
      })
    });
  });

  render() {
    const { currentTime } = this.state;
    const { indicatorComponent } = this.props;
    return (
      <Plugin
        name="CurrentTimeIndicator"
        dependencies={pluginDependencies}
      >
        <Getter
          name="viewCellsData"
          computed={this.viewCellsDataComputed(currentTime)}
        />
        <Template
          name="cell"
        >
          {params => (
            <TemplatePlaceholder
              params={{
                ...params,
                currentTime,
                currentTimeIndicatorComponent: indicatorComponent,
              }}
            />
          )}
        </Template>
      </Plugin>
    );
  }
}

/** A plugin that renders the Scheduler's button which sets the current date to today's date. */
export const CurrentTimeIndicator: React.ComponentType = CurrentTimeIndicatorBase;
