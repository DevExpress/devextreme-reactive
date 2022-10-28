import 'jsdom-global/register';
import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-core';
import { withContext, withHostAndPosition } from './with-props-from-context';
import { PluginHostContext, PositionContext } from '../plugin-based/contexts';
import { PLUGIN_HOST_CONTEXT, POSITION_CONTEXT } from '../plugin-based/constants';

describe('With props from context HOC', () => {
  const positionContext = () => [];
  const hostContext = new(jest.fn<PluginHost, any>())();
  const ContextProvider = ({ children }) => (
    <PluginHostContext.Provider value={hostContext}>
      <PositionContext.Provider value={positionContext}>
        {children}
      </PositionContext.Provider>
    </PluginHostContext.Provider>
  );
  describe('#withHostAndPosition', () => {
    const expectedContexts = {
      [PLUGIN_HOST_CONTEXT]: hostContext,
      [POSITION_CONTEXT]: positionContext,
    };
    it('should provide props from contexts', () => {
      const TestBase = () => <div />;
      const Test = withHostAndPosition(TestBase);
      const tree = mount(<ContextProvider><Test /></ContextProvider>);

      expect(tree.find(TestBase).props())
        .toEqual(expectedContexts);
    });

    it('should keep component props if provide new props from contexts', () => {
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
          [PLUGIN_HOST_CONTEXT]: hostContext,
        });
    });

    it('should keep component props if provide new props from contexts', () => {
      const TestBase = ({ name }) => <div className={name} />;
      const Test = withContext(PluginHostContext, PLUGIN_HOST_CONTEXT)(TestBase);
      const tree = mount(<ContextProvider><Test name="Test" /></ContextProvider>);

      expect(tree.find(TestBase).props())
        .toEqual({
          [PLUGIN_HOST_CONTEXT]: hostContext,
          name: 'Test',
        });
      expect(tree.find('.Test').exists())
        .toBeTruthy();
    });
  });
});
