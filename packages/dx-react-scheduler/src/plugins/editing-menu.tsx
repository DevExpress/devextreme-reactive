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

  // EditingState ----- [ Menu ]  ---X-> Tooltip, dnd
  // -> startOperation ->  Menu -X-> commit
  //  -> start -> State -> commit

  // dnd, tooltip -> start(flag) -> [EditingState] start: !flag ? commit()
  //                             \> [Menu] start: show popup | Current -> commit('current')

  // action1 -> Menu -> flag && action2

  // dnd flag ? action2 : action1



  //dnd : commitChanges(flag) -> EditingState: !flag ? commit() : flag()
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
        <Action name="finishOperation" action={(flag, getters, actions) => { this.setState({ openMenu: true }) }} />
        <Action name="flag" action={() => { this.setState({ openMenu: true }) }} />


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
 * The EditingMenu plugin.
 * */
export const EditingMenu: React.ComponentType = EditingMenuBase;
