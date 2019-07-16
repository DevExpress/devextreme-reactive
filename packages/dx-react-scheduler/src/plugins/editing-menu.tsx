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
    };

    this.enhancementCommitChanged = ({ commitChangedAppointment }) => {
      return () => this.setState({ isOpen: true, commitChangedAppointment });
    };
  }

  toggleOpen = () => {
    this.setState(state => ({
      isOpen: !state.isOpen,
    }));
  }

  render() {
    const { isOpen, commitChangedAppointment } = this.state;

    return (
      <Plugin
        name="EditingMenu"
        dependencies={pluginDependencies}
      >
        <Getter name="isOpenEditingMenu" value={isOpen} />
        <Action name="toggleEditingMenuOpen" action={this.toggleOpen} />
        <Getter name="commitChangedAppointment" computed={this.enhancementCommitChanged} />

        <Template name="footer">
          <TemplateConnector>
            {(getters) => {
              if (isOpen) {
                return (
                  <React.Fragment>
                    <TemplatePlaceholder />
                    <div>
                      Choose edit mode
                      <ul>
                        <li>
                          <button onClick={() => { commitChangedAppointment('current'); this.toggleOpen(); }}>
                            This event
                          </button>
                        </li>
                        <li>
                          <button onClick={() => { commitChangedAppointment('follows'); this.toggleOpen(); }}>
                            This and following events
                          </button>
                        </li>
                        <li>
                          <button onClick={() => { commitChangedAppointment('all'); this.toggleOpen(); }}>
                            All events
                          </button>
                        </li>
                        <br />
                        <li>
                          <button onClick={this.toggleOpen}>
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
