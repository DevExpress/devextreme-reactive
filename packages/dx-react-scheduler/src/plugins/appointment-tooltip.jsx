import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
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
  { name: 'EditingState', optional: true },
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
        visible: () => {
          const { onVisibilityChange } = this.props;
          return onVisibilityChange;
        },
        appointmentMeta: () => {
          const { onAppointmentMetaChange } = this.props;
          return onAppointmentMetaChange;
        },
      },
    );

    const toggleVisibility = () => {
      const { visible: isOpen } = this.state;
      return !isOpen;
    };
    this.toggleVisibility = stateHelper.applyFieldReducer
      .bind(stateHelper, 'visible', toggleVisibility);
    this.setAppointmentMeta = stateHelper.applyFieldReducer
      .bind(stateHelper, 'appointmentMeta', setAppointmentMeta);
    this.onAppointmentClick = ({ target, data }) => {
      this.setAppointmentMeta({ target, data });
      this.toggleVisibility();
    };
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
      headerComponent,
      contentComponent,
      commandButtonComponent,
    } = this.props;
    const { visible, appointmentMeta } = this.state;

    return (
      <Plugin
        name="AppointmentTooltip"
        dependencies={pluginDependencies}
      >
        <Template name="main">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({
              dateFormat,
            }, {
              commitDeletedAppointment,
            }) => {
              const onDeleteButtonClick = () => {
                commitDeletedAppointment({
                  deletedAppointmentId: appointmentMeta.data.id,
                });
                this.toggleVisibility();
              };
              return (
                <TemplatePlaceholder
                  name="tooltip"
                  params={{
                    commandButtonComponent,
                    showOpenButton,
                    showDeleteButton,
                    showCloseButton,
                    headerComponent,
                    contentComponent,
                    appointmentMeta,
                    visible,
                    onHide: this.toggleVisibility,
                    commandButtonIds,
                    ...commitDeletedAppointment && {
                      onDeleteButtonClick,
                    },
                    dateFormat,
                  }}
                />
              );
            }}
          </TemplateConnector>
        </Template>

        <Template name="tooltip">
          {params => <Layout {...params} />}
        </Template>

        <Template name="appointment">
          {params => (
            <TemplatePlaceholder
              params={{
                ...params,
                onClick: (
                  { target, data },
                ) => this.onAppointmentClick({ target, data }),
              }}
            />
          )}
        </Template>
      </Plugin>
    );
  }
}

AppointmentTooltip.propTypes = {
  layoutComponent: PropTypes.func.isRequired,
  headerComponent: PropTypes.func.isRequired,
  contentComponent: PropTypes.func.isRequired,
  commandButtonComponent: PropTypes.func.isRequired,
  showOpenButton: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  visible: PropTypes.bool,
  appointmentMeta: PropTypes.shape({
    target: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func,
    ]),
    data: PropTypes.object,
  }),
  onVisibilityChange: PropTypes.func,
  onAppointmentMetaChange: PropTypes.func,
};

AppointmentTooltip.defaultProps = {
  onAppointmentMetaChange: undefined,
  onVisibilityChange: undefined,
  appointmentMeta: undefined,
  visible: undefined,
  showOpenButton: false,
  showDeleteButton: false,
  showCloseButton: false,
};

AppointmentTooltip.components = {
  layoutComponent: 'Layout',
  headerComponent: 'Header',
  contentComponent: 'Content',
  commandButtonComponent: 'CommandButton',
};
