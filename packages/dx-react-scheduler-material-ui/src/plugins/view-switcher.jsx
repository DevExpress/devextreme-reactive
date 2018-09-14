import * as React from 'react';
import { ViewSwitcher as ViewSwitcherBase } from '@devexpress/dx-react-scheduler';
import { Switcher } from '../templates/view-switcher/switcher';


export class ViewSwitcher extends React.PureComponent {
  render() {
    return (
      <ViewSwitcherBase
        switcherComponent={Switcher}
        {...this.props}
      />
    );
  }
}

ViewSwitcher.Switcher = Switcher;
