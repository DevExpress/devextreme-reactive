import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState, executeComputedAction } from './test-utils';

export const testStatePluginField = ({
  Plugin,
  propertyName,
  getterName = propertyName,
  getGetterValue = tree => getComputedState(tree)[getterName],
  defaultDeps = {},
  defaultProps = {},
  values,
  actions,
  customPayload = {},
}) => {
  const capitalizedPropertyName = propertyName[0].toUpperCase() + propertyName.slice(1);
  const defaultPropertyName = `default${capitalizedPropertyName}`;
  const eventPropertyName = `on${capitalizedPropertyName}Change`;

  describe(`${propertyName} controlled/uncontrolled changes`, () => {
    it(`should provide ${propertyName} defined in ${defaultPropertyName} property`, () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <Plugin
            {...defaultProps}
            {...{
              [defaultPropertyName]: values[0],
            }}
          />
        </PluginHost>
      ));

      expect(getGetterValue(tree))
        .toBe(values[0]);
    });

    it(`should provide ${propertyName} defined in ${propertyName} property`, () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <Plugin
            {...defaultProps}
            {...{
              [propertyName]: values[0],
            }}
          />
        </PluginHost>
      ));

      expect(getGetterValue(tree))
        .toBe(values[0]);
    });

    it(`should apply ${propertyName} defined in ${propertyName} property after change`, () => {
      // eslint-disable-next-line react/prop-types
      const Test = ({ prop }) => (
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <Plugin
            {...defaultProps}
            {...{
              [propertyName]: prop,
            }}
          />
        </PluginHost>
      );

      const tree = mount(<Test prop={values[0]} />);

      tree.setProps({ prop: values[1] });
      tree.update();

      expect(getGetterValue(tree))
        .toBe(values[1]);
    });

    actions.forEach(({
      actionName,
      reducer,
      fieldReducer = true,
    }) => {
      it(`should fire the ${eventPropertyName} callback and should change ${propertyName} in uncontrolled mode after the ${actionName} action is fired`, () => {
        const change = jest.fn();
        const tree = mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <Plugin
              {...defaultProps}
              {...{
                [defaultPropertyName]: values[0],
                [eventPropertyName]: change,
              }}
            />
          </PluginHost>
        ));

        const payload = {};
        reducer.mockReturnValue(fieldReducer ? values[1] : { [propertyName]: values[1] });
        executeComputedAction(tree, computedActions => computedActions[actionName](payload));

        expect(reducer)
          .toBeCalledWith(
            fieldReducer ? values[0] : expect.objectContaining({ [propertyName]: values[0] }),
            customPayload,
          );

        expect(getGetterValue(tree))
          .toBe(values[1]);

        expect(change)
          .toBeCalledWith(values[1]);
      });

      it(`should fire the ${eventPropertyName} callback and should change ${propertyName} in controlled mode after the ${actionName} action is fired`, () => {
        jest.useFakeTimers();

        const change = jest.fn();
        const tree = mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <Plugin
              {...defaultProps}
              {...{
                [propertyName]: values[0],
                [eventPropertyName]: change,
              }}
            />
          </PluginHost>
        ));

        const payload = {};
        reducer.mockReturnValue(fieldReducer ? values[1] : { [propertyName]: values[1] });
        executeComputedAction(tree, computedActions => computedActions[actionName](payload));

        // force state syncronization
        jest.runAllTimers();
        tree.update();

        expect(getGetterValue(tree))
          .toBe(values[0]);
      });

      it(`should not apply undefined ${propertyName} property after ${actionName} action calls`, () => {
        // eslint-disable-next-line react/prop-types
        const Test = ({ prop }) => (
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <Plugin
              {...defaultProps}
              {...{
                [defaultPropertyName]: values[0],
                anotherProp: prop,
              }}
            />
          </PluginHost>
        );

        const tree = mount(<Test prop={values[0]} />);
        const payload = {};
        reducer.mockReturnValue(fieldReducer ? values[1] : { [propertyName]: values[1] });
        executeComputedAction(tree, (computedActions) => {
          computedActions[actionName](payload);
          tree.setProps({ prop: values[2] });
        });

        expect(getGetterValue(tree))
          .toBe(values[1]);
      });

      it(`should correctly work with the several ${actionName} action calls`, () => {
        const change = jest.fn();
        const tree = mount((
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <Plugin
              {...defaultProps}
              {...{
                [defaultPropertyName]: values[0],
                [eventPropertyName]: change,
              }}
            />
          </PluginHost>
        ));

        const payload = {};
        reducer
          .mockReturnValueOnce(fieldReducer ? values[1] : { [propertyName]: values[1] })
          .mockReturnValueOnce(fieldReducer ? values[2] : { [propertyName]: values[2] });
        executeComputedAction(tree, (computedActions) => {
          computedActions[actionName](payload);
          computedActions[actionName](payload);
        });

        expect(reducer)
          .lastCalledWith(
            fieldReducer ? values[1] : expect.objectContaining({ [propertyName]: values[1] }),
            customPayload,
          );

        expect(change)
          .toHaveBeenCalledTimes(1);
      });

      it(`should correctly work when ${eventPropertyName} change event changes`, () => {
        // eslint-disable-next-line react/prop-types
        const Test = ({ changeHandler }) => (
          <PluginHost>
            {pluginDepsToComponents(defaultDeps)}
            <Plugin
              {...defaultProps}
              {...{
                [defaultPropertyName]: values[0],
                [eventPropertyName]: changeHandler,
              }}
            />
          </PluginHost>
        );

        const tree = mount((
          <Test changeHandler={jest.fn()} />
        ));

        const change = jest.fn();
        tree.setProps({
          changeHandler: change,
        });

        const payload = {};
        reducer
          .mockReturnValueOnce(fieldReducer ? values[1] : { [propertyName]: values[1] });
        executeComputedAction(tree, (computedActions) => {
          computedActions[actionName](payload);
        });

        expect(change)
          .toHaveBeenCalledTimes(1);
      });
    });
  });
};
