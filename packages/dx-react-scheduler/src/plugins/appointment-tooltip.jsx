import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  Action,
  createStateHelper,
} from '@devexpress/dx-react-core';
import {
  OPEN_COMMAND_BUTTON,
  CLOSE_COMMAND_BUTTON,
  DELETE_COMMAND_BUTTON,
  setAppointmentMeta,
} from '@devexpress/dx-scheduler-core';

const pluginDependencies = [
  { name: 'Appointments' },
];

const commandButtonIds = {
  open: OPEN_COMMAND_BUTTON,
  close: CLOSE_COMMAND_BUTTON,
  delete: DELETE_COMMAND_BUTTON,
};

export class AppointmentTooltip extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
      appointmentMeta: props.appointmentMeta,
    };

    const stateHelper = createStateHelper(
      this,
      {
        visible: () => props.onVisibleChange,
        appointmentMeta: () => props.onAppointmentMetaChange,
      },
    );

    const toggleVisible = () => {
      const { visible: isOpen } = this.state;
      return !isOpen;
    };
    this.toggleVisible = stateHelper.applyFieldReducer
      .bind(stateHelper, 'visible', toggleVisible);
    this.setAppointmentMeta = stateHelper.applyFieldReducer
      .bind(stateHelper, 'appointmentMeta', setAppointmentMeta);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      visible = prevState.visible,
      appointmentMeta = prevState.appointmentMeta,
    } = nextProps;
    return {
      appointmentMeta,
      visible,
    };
  }

  render() {
    const {
      showOpenButton,
      showDeleteButton,
      showCloseButton,
      layoutComponent: Layout,
      headComponent,
      contentComponent,
      commandButtonComponent,
    } = this.props;
    const { visible, appointmentMeta } = this.state;

    return (
      <Plugin
        name="AppointmentTooltip"
        dependencies={pluginDependencies}
      >
        <Action name="toggleTooltipVisible" action={this.toggleVisible} />
        <Action name="setTooltipAppointmentMeta" action={this.setAppointmentMeta} />
        <Template name="main">
          <TemplateConnector>
            {({
              getAppointmentEndDate,
              getAppointmentStartDate,
              getAppointmentTitle,
            }) => (
              <React.Fragment>
                <TemplatePlaceholder />
                <Layout
                  commandButtonComponent={commandButtonComponent}
                  showOpenButton={showOpenButton}
                  showDeleteButton={showDeleteButton}
                  showCloseButton={showCloseButton}
                  headComponent={headComponent}
                  contentComponent={contentComponent}
                  appointmentMeta={appointmentMeta}
                  visible={visible}
                  onHide={this.toggleVisible}
                  commandButtonIds={commandButtonIds}

                  getAppointmentTitle={getAppointmentTitle}
                  getAppointmentStartDate={getAppointmentStartDate}
                  getAppointmentEndDate={getAppointmentEndDate}
                />
              </React.Fragment>
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

AppointmentTooltip.propTypes = {
  layoutComponent: PropTypes.func.isRequired,
  headComponent: PropTypes.func.isRequired,
  contentComponent: PropTypes.func.isRequired,
  commandButtonComponent: PropTypes.func.isRequired,
  showOpenButton: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  visible: PropTypes.bool,
  appointmentMeta: PropTypes.object,
  onVisibleChange: PropTypes.func,
  onAppointmentMetaChange: PropTypes.func,
};

AppointmentTooltip.defaultProps = {
  onAppointmentMetaChange: undefined,
  onVisibleChange: undefined,
  appointmentMeta: undefined,
  visible: undefined,
  showOpenButton: false,
  showDeleteButton: false,
  showCloseButton: false,
};
