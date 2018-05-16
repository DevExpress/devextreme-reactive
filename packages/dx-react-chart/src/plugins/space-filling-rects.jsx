import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Template, TemplateConnector } from '@devexpress/dx-react-core';

export class SpaceFillingRects extends React.PureComponent {
  render() {
    const { placeholders } = this.props;
    return (
      <Plugin name="SpaceFillingRects">
        {placeholders.map(name => (
          <Template name={name} key={name}>
            <TemplateConnector>
              {({ layouts: positions }) => {
                const [, horizontal, postfix] = name.split('-');
                const { width } = positions[horizontal + (postfix ? `-${postfix}` : '')] || {};
                return <div id={name} style={{ width }} />;
              }}
            </TemplateConnector>
          </Template>
        ))}
      </Plugin>
    );
  }
}

SpaceFillingRects.propTypes = {
  placeholders: PropTypes.arrayOf(PropTypes.string).isRequired,
};
