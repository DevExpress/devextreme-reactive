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
      // appointmentComponent: Appointment,
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
            {({ dayScale }) => (
              <Layout
                cellComponent={Cell}
                rowComponent={Row}
                dayScale={dayScale}
              />
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

AllDayPanel.propTypes = {
  // appointmentComponent: PropTypes.func.isRequired,
  layoutComponent: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
};
