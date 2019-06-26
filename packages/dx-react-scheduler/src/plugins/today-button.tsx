import * as React from 'react';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  PluginComponents,
} from '@devexpress/dx-react-core';
import { TodayButtonProps } from '../types/today-button';

const pluginDependencies = [
  { name: 'Toolbar' },
  { name: 'ViewState' },
];

const defaultMessages = {
  today: 'today',
};

/** A plugin that renders the Scheduler's button which sets the current date to today's date. */
export class TodayButton extends React.PureComponent<TodayButtonProps> {

  static components: PluginComponents = {
    buttonComponent: 'Button',
  };

  render() {
    const {
      buttonComponent: Button,
      messages,
    } = this.props;
    const getMessage = getMessagesFormatter({ ...defaultMessages, ...messages });
    return (
      <Plugin
        name="TodayButton"
        dependencies={pluginDependencies}
      >
        <Template name="toolbarContent">
          <TemplateConnector>
            {({ }, {
              changeCurrentDate,
            }) => {
              const setCurrentDate = nextDate => changeCurrentDate({
                nextDate,
              });
              return (
                <Button
                  getMessage={getMessage}
                  setCurrentDate={setCurrentDate}
                />
              );
            }}
          </TemplateConnector>
          <TemplatePlaceholder />
        </Template>
      </Plugin>
    );
  }
}
