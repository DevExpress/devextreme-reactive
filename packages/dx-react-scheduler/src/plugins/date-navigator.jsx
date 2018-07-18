import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import {
  monthCells,
  viewBoundTitle,
  dayScale,
} from '@devexpress/dx-scheduler-core';

const pluginDependencies = [
  { name: 'Toolbar' },
  { name: 'ViewState' },
];

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
        <Template name="toolbarContent">
          <TemplateConnector>
            {({
                currentDate,
                startViewDate,
                endViewDate,
                firstDayOfWeek,
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
                      firstDayOfWeek={firstDayOfWeek}
                      getCells={monthCells}
                      getHeaderCells={dayScale}
                      titleComponent={CalendarTitle}
                      navigationButtonComponent={CalendarNavigationButton}
                      rowComponent={CalendarRow}
                      cellComponent={CalendarCell}
                      headerRowComponent={CalendarHeaderRow}
                      headerCellComponent={CalendarHeaderCell}
                      navigatorComponent={CalendarNavigator}
                      onNavigate={navigateAction}
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
