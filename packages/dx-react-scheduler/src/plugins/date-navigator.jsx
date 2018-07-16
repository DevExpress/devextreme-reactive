import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  Getter,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import {
  monthCells as monthCellsCore,
  viewBoundTitle,
  dayScale,
} from '@devexpress/dx-scheduler-core';

const pluginDependencies = [
  { name: 'Toolbar' },
  { name: 'ViewState' },
];

const monthCellsComputed = ({ currentDate, firstDayOfWeek }) =>
  monthCellsCore(currentDate, firstDayOfWeek);

const weekDaysComputed = ({ currentDate, firstDayOfWeek }) =>
  dayScale(currentDate, firstDayOfWeek);

const navigate = action => payload => action({ ...payload, step: 7 });

export class DateNavigator extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.targetRef = this.targetRef.bind(this);
  }
  targetRef(button) {
    this.button = button;
  }
  handleToggle() {
    this.setState({ visible: !this.state.visible });
  }
  handleHide() {
    this.setState({ visible: false });
  }
  render() {
    const {
      rootComponent: Root,
      overlayComponent: Overlay,
      toggleButtonComponent: ToggleButton,
      navigationButtonComponent: NavigationButton,

      calendarComponent: Calendar,
      calendarRowComponent: CalendarRow,
      calendarCellComponent: CalendarCell,
      calendarHeaderRowComponent: CalendarHeaderRow,
      calendarHeaderCellComponent: CalendarHeaderCell,
      calendarTitleComponent: CalendarTitle,
      calendarNavigationButtonComponent: CalendarNavigationButton,
      calendarNavigatorComponent: CalendarNavigator,
    } = this.props;

    const { visible } = this.state;
    return (
      <Plugin
        name="DateNavigator"
        dependencies={pluginDependencies}
      >
        <Getter name="monthCells" computed={monthCellsComputed} />
        <Getter name="weekDays" computed={weekDaysComputed} />
        <Template name="toolbarContent">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
                monthCells,
                weekDays,
                currentDate,
                startViewDate,
                endViewDate,
              }, {
                setCurrentDate,
              }) => {
              const navigateAction = navigate(setCurrentDate);
              const navigatorTitle = viewBoundTitle(startViewDate, endViewDate, 'week');
              return (
                <React.Fragment>
                  <Root
                    navigationButtonComponent={NavigationButton}
                    toggleButtonComponent={ToggleButton}
                    navigatorTitle={navigatorTitle}
                    targetRef={this.targetRef}
                    onToggle={this.handleToggle}
                    onNavigate={navigateAction}
                  />
                  <Overlay
                    visible={visible}
                    target={this.button}
                    onHide={this.handleHide}
                  >
                    <Calendar
                      currentDate={currentDate}
                      cells={monthCells}
                      headerCells={weekDays}
                      titleComponent={CalendarTitle}
                      navigationButtonComponent={CalendarNavigationButton}
                      rowComponent={CalendarRow}
                      cellComponent={CalendarCell}
                      headerRowComponent={CalendarHeaderRow}
                      headerCellComponent={CalendarHeaderCell}
                      navigatorComponent={CalendarNavigator}
                      onCellClick={navigateAction}
                      onNavigate={navigateAction}
                    />
                  </Overlay>
                </React.Fragment>
              );
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

DateNavigator.propTypes = {
  rootComponent: PropTypes.func.isRequired,
  overlayComponent: PropTypes.func.isRequired,
  toggleButtonComponent: PropTypes.func.isRequired,
  navigationButtonComponent: PropTypes.func.isRequired,
  calendarComponent: PropTypes.func.isRequired,
  calendarRowComponent: PropTypes.func.isRequired,
  calendarCellComponent: PropTypes.func.isRequired,
  calendarHeaderRowComponent: PropTypes.func.isRequired,
  calendarHeaderCellComponent: PropTypes.func.isRequired,
  calendarTitleComponent: PropTypes.func.isRequired,
  calendarNavigationButtonComponent: PropTypes.func.isRequired,
  calendarNavigatorComponent: PropTypes.func.isRequired,
};
