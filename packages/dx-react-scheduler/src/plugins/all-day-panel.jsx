import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';

const pluginDependencies = [
  { name: 'WeekView' },
];

export class AllDayPanel extends React.PureComponent {
  render() {
    const {
      appointmentComponent: Appointment,
      appointmentsContainerComponent: AppointmentsContainer,
      layoutComponent: Layout,
      cellComponent: Cell,
      rowComponent: Row,
    } = this.props;

    return (
      <Plugin
        name="AllDayPanel"
        dependencies={pluginDependencies}
      >
        <Template name="navbar">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ dayScale, currentView }) => {
              if (currentView === 'month') return null; // currentView.type === month
              return (
                <Layout
                  cellComponent={Cell}
                  rowComponent={Row}
                  dayScale={dayScale}
                >
                  <AppointmentsContainer>
                    {<div className="appointment" style={{ position: 'absolute', height: '30px', width: '110px', left: '14%', transform: 'translateY(20px)', backgroundColor: 'darkblue' }} />}
                  </AppointmentsContainer>
                </Layout>
              );
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

AllDayPanel.propTypes = {
  appointmentComponent: PropTypes.func.isRequired,
  appointmentsContainerComponent: PropTypes.func.isRequired,
  layoutComponent: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
};
