import * as React from 'react';
import {
  Plugin, Getter, Template, TemplatePlaceholder, TemplateConnector, Action,
} from '@devexpress/dx-react-core';

const pluginDependencies = [
  { name: 'EditingState' },
];

class EditingMenuBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      commitChangedAppointment: () => undefined,
      commitDeletedAppointment: () => undefined,
    };

    this.enhancementCommitChanged = ({ commitChangedAppointment }) => {
      return () => this.setState({ isCommitChanged: true, commitChangedAppointment });
    };
    this.enhancementCommitDeleted = ({ commitDeletedAppointment }) => {
      return (deletedAppointment) => this.setState({
        isCommitDeleted: true,
        commitDeletedAppointment: type => commitDeletedAppointment(deletedAppointment, type),
      });
    };
  }

  closeMenu = () => {
    this.setState({
      isCommitChanged: false,
      isCommitDeleted: false,
    });
  }

  render() {
    const {
      isCommitChanged, isCommitDeleted,
      commitChangedAppointment, commitDeletedAppointment,
    } = this.state;

    return (
      <Plugin
        name="EditingMenu"
        dependencies={pluginDependencies}
      >
        <Getter name="commitChangedAppointment" computed={this.enhancementCommitChanged} />
        <Getter name="commitDeletedAppointment" computed={this.enhancementCommitDeleted} />

        <Template name="footer">
          <TemplateConnector>
            {(getters) => {
              if (isCommitDeleted || isCommitChanged) {
                const commitFunction = isCommitChanged ?
                  commitChangedAppointment : commitDeletedAppointment;
                return (
                  <React.Fragment>
                    <TemplatePlaceholder />
                    <div>
                      Choose edit mode
                      <ul>
                        <li>
                          <button onClick={() => { commitFunction('current'); this.closeMenu(); }}>
                            This event
                          </button>
                        </li>
                        <li>
                          <button onClick={() => { commitFunction('follows'); this.closeMenu(); }}>
                            This and following events
                          </button>
                        </li>
                        <li>
                          <button onClick={() => { commitFunction('all'); this.closeMenu(); }}>
                            All events
                          </button>
                        </li>
                        <br />
                        <li>
                          <button onClick={this.closeMenu}>
                            close
                          </button>
                        </li>
                      </ul>
                    </div>
                  </React.Fragment>
                );
              }
              return null;
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

/***
 * The Scheduler is a root container component designed to process
 * and display the specified data. The Scheduler's functionality
 * (data visualization and processing) is implemented in several plugins
 * specified as child components.
 * */
export const EditingMenu: React.ComponentType = EditingMenuBase;
