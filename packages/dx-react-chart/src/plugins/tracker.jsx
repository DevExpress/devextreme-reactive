import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  Template,
  Getter,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { buildEventHandler } from '@devexpress/dx-chart-core';

const wrapToList = arg => (arg ? [arg] : []);

export class Tracker extends React.PureComponent {
  render() {
    const { onClick, onPointerMove } = this.props;
    return (
      <Plugin name="Tracker">
        <Getter name="clickHandlers" value={wrapToList(onClick)} />
        <Getter name="pointerMoveHandlers" value={wrapToList(onPointerMove)} />
        <Template name="canvas">
          <TemplateConnector>
            {(getters) => {
              const { clickHandlers, pointerMoveHandlers } = getters;
              const handlers = {};
              if (clickHandlers.length) {
                handlers.onClick = buildEventHandler(getters, clickHandlers);
              }
              if (pointerMoveHandlers.length) {
                handlers.onPointerMove = buildEventHandler(getters, pointerMoveHandlers);
              }
              return <TemplatePlaceholder params={handlers} />;
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

Tracker.propTypes = {
  onClick: PropTypes.func,
  onPointerMove: PropTypes.func,
};

Tracker.defaultProps = {
  onClick: undefined,
  onPointerMove: undefined,
};
