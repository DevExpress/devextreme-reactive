import * as React from 'react';
import { mount } from 'enzyme';
import { withContext, withHostAndPosition } from './with-props-from-context';
import { PluginHostContext, PositionContext } from '../plugin-based/contexts';
import { PLUGIN_HOST_CONTEXT, POSITION_CONTEXT } from '../plugin-based/constants';

describe('With props from context HOC', () => {
  // eslint-disable-next-line react/prop-types
  const ContextProvider = ({ children }) => (
    <PluginHostContext.Provider value="pluginHostContext">
      <PositionContext.Provider value="positionContext">
        {children}
      </PositionContext.Provider>
    </PluginHostContext.Provider>
  );
  describe('#withHostAndPosition', () => {
    const expectedContexts = {
      [PLUGIN_HOST_CONTEXT]: 'pluginHostContext',
      [POSITION_CONTEXT]: 'positionContext',
    };
    it('should provide props from contexts', () => {
      const TestBase = () => <div />;
      const Test = withHostAndPosition(TestBase);
      const tree = mount(<ContextProvider><Test /></ContextProvider>);

      expect(tree.find(TestBase).props())
        .toEqual(expectedContexts);
    });

    it('should keep component props if provide new props from contexts', () => {
      // eslint-disable-next-line react/prop-types
      const TestBase = ({ name }) => <div className={name} />;
      const Test = withHostAndPosition(TestBase);
      const tree = mount(<ContextProvider><Test name="Test" /></ContextProvider>);

      expect(tree.find(TestBase).props())
        .toEqual({
          ...expectedContexts,
          name: 'Test',
        });
      expect(tree.find('.Test').exists())
        .toBeTruthy();
    });
  });

  describe('#withContext', () => {
    it('should provide props from contexts', () => {
      const TestBase = () => <div />;
      const Test = withContext(PluginHostContext, PLUGIN_HOST_CONTEXT)(TestBase);
      const tree = mount(<ContextProvider><Test /></ContextProvider>);

      expect(tree.find(TestBase).props())
        .toEqual({
          [PLUGIN_HOST_CONTEXT]: 'pluginHostContext',
        });
    });

    it('should keep component props if provide new props from contexts', () => {
      // eslint-disable-next-line react/prop-types
      const TestBase = ({ name }) => <div className={name} />;
      const Test = withContext(PluginHostContext, PLUGIN_HOST_CONTEXT)(TestBase);
      const tree = mount(<ContextProvider><Test name="Test" /></ContextProvider>);

      expect(tree.find(TestBase).props())
        .toEqual({
          [PLUGIN_HOST_CONTEXT]: 'pluginHostContext',
          name: 'Test',
        });
      expect(tree.find('.Test').exists())
        .toBeTruthy();
    });
  });
});
