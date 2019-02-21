import * as React from 'react';
import * as PropTypes from 'prop-types';

import {
  Plugin,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

export class Title extends React.PureComponent {
  render() {
    const {
      textComponent: Text,
      text,
      position,
    } = this.props;
    const placeholder = position;
    return (
      <Plugin name="Title">
        <Template name={placeholder}>
          <TemplatePlaceholder />
          <Text text={text} />
        </Template>
      </Plugin>
    );
  }
}

Title.propTypes = {
  textComponent: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  position: PropTypes.string,
};

Title.defaultProps = {
  position: 'top',
};

Title.components = {
  textComponent: 'Text',
};
