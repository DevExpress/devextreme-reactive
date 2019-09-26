import * as React from 'react';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  PluginComponents,
} from '@devexpress/dx-react-core';
import {
  monthCellsData,
  viewBoundText,
} from '@devexpress/dx-scheduler-core';
import { memoize } from '@devexpress/dx-core';

import { DateNavigatorProps, DateNavigatorState } from '../types';

const pluginDependencies = [
  { name: 'Toolbar' },
  { name: 'ViewState' },
];

const navigate = (action, currentView, intervalCount) => (direction, nextDate) => action({
  direction,
  nextDate,
  amount: intervalCount,
  step: currentView.type,
});

class DateNavigatorBase extends React.PureComponent<DateNavigatorProps, DateNavigatorState> {
  target!: React.ReactInstance;

  state = {
    visible: false,
  };
  static components: PluginComponents = {
    rootComponent: 'Root',
    overlayComponent: 'Overlay',
    openButtonComponent: 'OpenButton',
    navigationButtonComponent: 'NavigationButton',
    calendarComponent: 'Calendar',
    calendarRowComponent: 'CalendarRow',
    calendarCellComponent: 'CalendarCell',
    calendarHeaderRowComponent: 'CalendarHeaderRow',
    calendarHeaderCellComponent: 'CalendarHeaderCell',
    calendarTextComponent: 'CalendarText',
    calendarNavigatorComponent: 'CalendarNavigator',
    calendarNavigationButtonComponent: 'CalendarNavigationButton',
  };

  setRootRef = (target: React.ReactInstance) => {
    this.target = target;
  }

  handleVisibilityToggle = () => {
    this.setState(prevState => ({ visible: !prevState.visible }));
  }

  handleHide = () => {
    this.setState({ visible: false });
  }

  navigateAction = memoize((changeCurrentDate, currentView, intervalCount, navigateAction) =>
    navigateAction(changeCurrentDate, currentView, intervalCount));

  render() {
    const {
      rootComponent: Root,
      overlayComponent: Overlay,
      openButtonComponent: OpenButton,
      navigationButtonComponent: NavigationButton,
      calendarComponent: Calendar,
      calendarRowComponent: CalendarRow,
      calendarCellComponent: CalendarCell,
      calendarHeaderRowComponent: CalendarHeaderRow,
      calendarHeaderCellComponent: CalendarHeaderCell,
      calendarTextComponent: CalendarText,
      calendarNavigationButtonComponent: CalendarNavigationButton,
      calendarNavigatorComponent: CalendarNavigator,
    } = this.props;

    const { visible } = this.state;
    return (
      <Plugin
        name="DateNavigator"
        dependencies={pluginDependencies}
      >
        <Template name="toolbarContent">
          <TemplateConnector>
            {({
              currentDate,
              startViewDate,
              endViewDate,
              firstDayOfWeek,
              currentView,
              intervalCount,
              formatDate,
            }, {
              changeCurrentDate,
            }) => {
              const navigateAction = this.navigateAction(
                changeCurrentDate, currentView, intervalCount, navigate,
              );
              const calendarDateChanged = (nextDate) => {
                navigateAction(undefined, nextDate);
                this.handleHide();
              };
              const navigatorText = viewBoundText(
                startViewDate,
                endViewDate,
                currentView,
                currentDate,
                intervalCount,
                formatDate,
              );
              return (
                <>
                  <Root
                    navigationButtonComponent={NavigationButton}
                    openButtonComponent={OpenButton}
                    navigatorText={navigatorText}
                    rootRef={this.setRootRef}
                    onVisibilityToggle={this.handleVisibilityToggle}
                    onNavigate={navigateAction}
                  />
                  <Overlay
                    visible={visible}
                    target={this.target}
                    onHide={this.handleHide}
                  >
                    <Calendar
                      selectedDate={currentDate}
                      firstDayOfWeek={firstDayOfWeek}
                      getCells={monthCellsData}
                      textComponent={CalendarText}
                      navigationButtonComponent={CalendarNavigationButton}
                      rowComponent={CalendarRow}
                      cellComponent={CalendarCell}
                      headerRowComponent={CalendarHeaderRow}
                      headerCellComponent={CalendarHeaderCell}
                      navigatorComponent={CalendarNavigator}
                      onSelectedDateChange={calendarDateChanged}
                      formatDate={formatDate}
                    />
                  </Overlay>
                </>
              );
            }}
          </TemplateConnector>
          <TemplatePlaceholder />
        </Template>
      </Plugin>
    );
  }
}

/** A plugin that renders the Scheduler’s date navigator. */
export const DateNavigator: React.ComponentType<DateNavigatorProps> = DateNavigatorBase;
