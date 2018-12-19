import * as React from 'react';
import { PluginHostContext, PositionContext } from '../plugin-based/contexts';
import { PLUGIN_HOST_CONTEXT, POSITION_CONTEXT } from '../plugin-based/constants';

/** @internal */
export const withContext = (Context, name) => Component => props => (
  <Context.Consumer>
    {context => (
      <Component {...props} {...{ [name]: context }} />
    )}
  </Context.Consumer>
);

/** @internal */
export const withHostAndPosition = Component => withContext(
  PluginHostContext,
  PLUGIN_HOST_CONTEXT,
)(withContext(PositionContext, POSITION_CONTEXT)(Component));
