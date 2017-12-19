import React from 'react';
import { ColumnChooser as ColumnChooserBase } from '@devexpress/dx-react-grid';
import { ContainerComponent } from '../templates/column-chooser/container-component';
import { ButtonComponent } from '../templates/column-chooser/button-component';
import { ColumnChooserItem } from '../templates/column-chooser/item-component';

const containerComponent = props => <ContainerComponent {...props} />;
const buttonComponent = props => <ButtonComponent {...props} />;
const itemComponent = props => <ColumnChooserItem {...props} />;

export class ColumnChooser extends React.PureComponent {
  render() {
    return (
      <ColumnChooserBase
        containerComponent={containerComponent}
        buttonComponent={buttonComponent}
        itemComponent={itemComponent}
        {...this.props}
      />
    );
  }
}
