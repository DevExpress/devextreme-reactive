import * as React from 'react';
import {
  Plugin, Getter, Template, TemplatePlaceholder, TemplateConnector, Action,
} from '@devexpress/dx-react-core';

class EditingMenuBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.commitChanged = () => {
      return () => this.setState({ isOpen: true });
    };
  }

  toggleOpen = () => {
    this.setState(state => ({
      isOpen: !state.isOpen,
    }));
  }

  render() {
    const { isOpen } = this.state;

    return (
      <Plugin
        name="EditingMenu"
      >
        <Getter name="isOpenEditingMenu" value={isOpen} />
        <Action name="toggleEditingMenuOpen" action={this.toggleOpen} />
        <Getter name="commitChangedAppointmentGetter" computed={this.commitChanged} />

        <Template name="footer">
          <TemplateConnector>
            {({ preCommitChanges }, actions) => {
              if (isOpen) {
                return (
                  <React.Fragment>
                    <TemplatePlaceholder />
                    <div>
                      Choose edit mode
                      <ul>
                        <li>
                          <button onClick={() => { preCommitChanges('current'); this.toggleOpen(); }}>
                            This event
                          </button>
                        </li>
                        <li>
                          <button onClick={() => { preCommitChanges('follows'); this.toggleOpen() }}>
                            This and following events
                          </button>
                        </li>
                        <li>
                          <button onClick={() => { preCommitChanges('all'); this.toggleOpen() }}>
                            All events
                          </button>
                        </li>
                        <br />
                        <li>
                          <button onClick={actions.toggleEditDialog}>
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
