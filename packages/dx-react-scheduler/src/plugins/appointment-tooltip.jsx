import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin, Template, TemplatePlaceholder, TemplateConnector,
} from '@devexpress/dx-react-core';

const pluginDependencies = [
  { name: 'Appointments' },
];

export class AppointmentTooltip extends React.PureComponent {
  render() {
    const {
      showOpenButton,
      showDeleteButton,
      showCloseButton,
      tooltipComponent: Tooltip,
      headComponent: Head,
      contentComponent: Content,
      openButtonComponent: OpenButton,
      deleteButtonComponent: DeleteButton,
      closeButtonComponent: CloseButton,
    } = this.props;

    return (
      <Plugin
        name="AppointmentTooltip"
        dependencies={pluginDependencies}
      >
        <Template name="main">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ selectedAppointment: { data, element } }) => (
              <Tooltip
                showOpenButton={showOpenButton}
                showDeleteButton={showDeleteButton}
                showCloseButton={showCloseButton}
                openButtonComponent={OpenButton}
                deleteButtonComponent={DeleteButton}
                closeButtonComponent={CloseButton}
                headComponent={Head}
                contentComponent={Content}
                tooltipComponent={Tooltip}
                appointment={data}
                target={element}
              />
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

AppointmentTooltip.propTypes = {
  tooltipComponent: PropTypes.func.isRequired,
  headComponent: PropTypes.func.isRequired,
  contentComponent: PropTypes.func.isRequired,
  openButtonComponent: PropTypes.func.isRequired,
  deleteButtonComponent: PropTypes.func.isRequired,
  closeButtonComponent: PropTypes.func.isRequired,
  showOpenButton: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
  showCloseButton: PropTypes.bool,
};

AppointmentTooltip.defaultProps = {
  showOpenButton: true,
  showDeleteButton: true,
  showCloseButton: true,
};
