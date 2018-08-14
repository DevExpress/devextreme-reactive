import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import {
  getAppointmentStyle,
  allDayAppointmentsRects,
} from '@devexpress/dx-scheduler-core';

const pluginDependencies = [
  { name: 'WeekView', optional: true },
];

const AppointmentPlaceholder = props => (
  <TemplatePlaceholder name="appointment" params={props} />
);

export class AllDayPanel extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tableRef: null,
    };
    this.allDayPanelRef = this.allDayPanelRef.bind(this);
  }

  allDayPanelRef(ref) {
    this.setState({
      tableRef: ref,
    });
  }

  render() {
    const {
      containerComponent: Container,
      layoutComponent: Layout,
      cellComponent: Cell,
      rowComponent: Row,
      textComponent: Text,
      messages,
    } = this.props;
    const { tableRef } = this.state;
    const getMessage = getMessagesFormatter(messages);

    return (
      <Plugin
        name="AllDayPanel"
        dependencies={pluginDependencies}
      >
        <TemplateConnector>
          {({
            dayScale, currentView, appointments, startViewDate, endViewDate, excludedDays,
          }) => {
            if (currentView === 'month') return null;
            const rects = tableRef ? allDayAppointmentsRects(
              appointments, startViewDate, endViewDate, excludedDays, dayScale, tableRef.querySelectorAll('th'),
            ) : [];
            return (
              <React.Fragment>
                <Template name="navbar">
                  <TemplatePlaceholder />
                  <Layout
                    allDayPanelRef={this.allDayPanelRef}
                    cellComponent={Cell}
                    rowComponent={Row}
                    dayScale={dayScale}
                  >
                    <Container>
                      {rects.map(({ dataItem, type, ...geometry }, index) => (
                        <AppointmentPlaceholder
                          style={getAppointmentStyle(geometry)}
                          type={type}
                          key={index.toString()}
                          appointment={dataItem}
                        />
                      ))}
                    </Container>
                  </Layout>
                </Template>

                <Template name="navbarEmpty">
                  <TemplatePlaceholder />
                  <Text getMessage={getMessage} />
                </Template>
              </React.Fragment>
            );
          }}
        </TemplateConnector>
      </Plugin>
    );
  }
}

AllDayPanel.propTypes = {
  containerComponent: PropTypes.func.isRequired,
  layoutComponent: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  textComponent: PropTypes.func.isRequired,
  messages: PropTypes.object.isRequired,
};
