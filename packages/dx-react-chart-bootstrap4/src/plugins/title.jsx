import * as React from 'react';
import { Title as TitleBase } from '@devexpress/dx-react-chart';
import { Text } from '../templates/title/text';

export class Title extends React.PureComponent {
  render() {
    return (
      <TitleBase
        textComponent={Text}
        {...this.props}
      />
    );
  }
}

Title.Text = Text;
