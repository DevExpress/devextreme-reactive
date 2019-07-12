import * as React from 'react';
import {
  Plugin, Getter, Template, TemplatePlaceholder, TemplateConnector,
} from '@devexpress/dx-react-core';

class EditingMenuBase extends React.PureComponent {
  render() {
    return (
      <Plugin
        name="EditingMenu"
      >
        <Getter name="editingMenu" value={true} />

        <Template name="footer">
          <TemplateConnector>
            {({ preCommitChanges, isDialogOpen }, actions) => {
              if (isDialogOpen) {
                return (
                  <React.Fragment>
                    <TemplatePlaceholder />
                    <div>
                      Choose edit mode
                      <ul>
                        <li>
                          <button onClick={() => preCommitChanges('current')}>
                            This event
                          </button>
                        </li>
                        <li>
                          <button onClick={() => preCommitChanges('follows')}>
                            This and following events
                          </button>
                        </li>
                        <li>
                          <button onClick={() => preCommitChanges('all')}>
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
