import * as React from 'react';
import { PluginHostContext, PositionContext } from '../plugin-based/contexts';
import { PLUGIN_HOST_CONTEXT, POSITION_CONTEXT } from '../plugin-based/constants';

export const withHostAndPosition = Component => props => (
  <PluginHostContext.Consumer>
    {pluginHostContext => (
      <PositionContext.Consumer>
        {positionContext => (
          <Component
            {...props}
            {...{ [PLUGIN_HOST_CONTEXT]: pluginHostContext, [POSITION_CONTEXT]: positionContext }}
          />
        )}
      </PositionContext.Consumer>
    )}
  </PluginHostContext.Consumer>
);

export const withContext = (Context, name) => Component => props => (
  <Context.Consumer>
    {context => (
      <Component {...props} {...{ [name]: context }} />
    )}
  </Context.Consumer>
);
