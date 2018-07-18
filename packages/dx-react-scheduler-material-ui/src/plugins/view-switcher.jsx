import * as React from 'react';
import { ViewSwitcher as ViewSwitcherBase } from '@devexpress/dx-react-scheduler';

import { Overlay } from '../templates/date-navigator/overlay'; // keep old!
import { ToggleButton } from '../templates/view-switcher/toggle-button';
import { Container } from '../templates/view-switcher/container';
import { Item } from '../templates/view-switcher/item';


export class ViewSwitcher extends React.PureComponent {
  render() {
    return (
      <ViewSwitcherBase
        overlayComponent={Overlay}
        toggleButtonComponent={ToggleButton}
        listComponent={Container}
        itemComponent={Item}
        {...this.props}
      />
    );
  }
}

ViewSwitcher.ToggleButton = ToggleButton;
ViewSwitcher.Overlay = Overlay;
ViewSwitcher.Container = Container;
ViewSwitcher.Item = Item;
