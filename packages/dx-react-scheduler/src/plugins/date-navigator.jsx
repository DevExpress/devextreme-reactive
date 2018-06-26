import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Template, TemplatePlaceholder, Plugin, TemplateConnector } from '@devexpress/dx-react-core';
import { monthCells } from '@devexpress/dx-scheduler-core';

const pluginDependencies = [
  { name: 'Toolbar' },
];

export class DateNavigator extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.buttonRef = this.buttonRef.bind(this);
  }
  buttonRef(button) {
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
      overlayComponent: Overlay,
      tableComponent: Table,
      cellComponent: Cell,
      rowComponent: Row,
      toggleButtonComponent: ToggleButton,
    } = this.props;

    const { visible } = this.state;
    return (
      <Plugin
        name="ColumnChooser"
        dependencies={pluginDependencies}
      >
        <Template name="toolbarContent">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ currentDate, firstDayOfWeek }) => (
              <React.Fragment>
                <ToggleButton
                  buttonRef={this.buttonRef}
                  onToggle={this.handleToggle}
                  active={visible}
                />
                <Overlay
                  visible={visible}
                  target={this.button}
                  onHide={this.handleHide}
                >
                  <Table
                    cells={monthCells(currentDate, firstDayOfWeek)}
                    rowComponent={Row}
                    cellComponent={Cell}
                  />
                </Overlay>
              </React.Fragment>
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

DateNavigator.propTypes = {
  overlayComponent: PropTypes.func.isRequired,
  tableComponent: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  toggleButtonComponent: PropTypes.func.isRequired,
};
