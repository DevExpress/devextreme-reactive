import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import {
  monthCellsData,
  viewBoundText,
} from '@devexpress/dx-scheduler-core';

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

export class DateNavigator extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    this.handleVisibilityToggle = this.handleVisibilityToggle.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.setRootRef = this.setRootRef.bind(this);
  }

  setRootRef(target) {
    this.target = target;
  }

  handleVisibilityToggle() {
    const { visible } = this.state;
    this.setState({ visible: !visible });
  }

  handleHide() {
    this.setState({ visible: false });
  }

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
              dateFormat,
            }, {
              changeCurrentDate,
            }) => {
              const navigateAction = navigate(changeCurrentDate, currentView, intervalCount);
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
                dateFormat(),
              );
              return (
                <React.Fragment>
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
                      dateFormat={dateFormat()}
                    />
                  </Overlay>
                </React.Fragment>
              );
            }}
          </TemplateConnector>
          <TemplatePlaceholder />
        </Template>
      </Plugin>
    );
  }
}

DateNavigator.propTypes = {
  rootComponent: PropTypes.func.isRequired,
  overlayComponent: PropTypes.func.isRequired,
  openButtonComponent: PropTypes.func.isRequired,
  navigationButtonComponent: PropTypes.func.isRequired,
  calendarComponent: PropTypes.func.isRequired,
  calendarRowComponent: PropTypes.func.isRequired,
  calendarCellComponent: PropTypes.func.isRequired,
  calendarHeaderRowComponent: PropTypes.func.isRequired,
  calendarHeaderCellComponent: PropTypes.func.isRequired,
  calendarTextComponent: PropTypes.func.isRequired,
  calendarNavigationButtonComponent: PropTypes.func.isRequired,
  calendarNavigatorComponent: PropTypes.func.isRequired,
};

DateNavigator.components = {
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
