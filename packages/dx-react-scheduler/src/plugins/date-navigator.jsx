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
      tableComponent: Table,
      rowComponent: Row,
      cellComponent: Cell,
      headerRowComponent: HeaderRow,
      headerCellComponent: HeaderCell,
      toggleButtonComponent: ToggleButton,
      navigatorComponent: Navigator,
      titleComponent: Title,
      navigationButtonComponent: NavigationButton,
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
                    <Navigator
                      currentDate={currentDate}
                      titleComponent={Title}
                      navigationButtonComponent={NavigationButton}
                      onNavigate={navigateAction}
                    />
                    <Table
                      headerCells={weekDays}
                      cells={monthCells}
                      rowComponent={Row}
                      cellComponent={Cell}
                      headerRowComponent={HeaderRow}
                      headerCellComponent={HeaderCell}
                      onCellClick={navigateAction}
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
  tableComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
  headerRowComponent: PropTypes.func.isRequired,
  headerCellComponent: PropTypes.func.isRequired,
  toggleButtonComponent: PropTypes.func.isRequired,
  navigatorComponent: PropTypes.func.isRequired,
  titleComponent: PropTypes.func.isRequired,
  navigationButtonComponent: PropTypes.func.isRequired,
};
