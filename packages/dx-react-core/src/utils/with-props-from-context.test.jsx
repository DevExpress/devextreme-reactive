import * as React from 'react';
import { mount } from 'enzyme';
import { withPropsFromContext } from './with-props-from-context';

describe('withPropsFromContext', () => {
  const Context1 = React.createContext();
  const Context2 = React.createContext();
  const createComponentWithProps = withPropsFromContext({
    Context: Context1,
    name: 'first',
  }, {
    Context: Context2,
    name: 'second',
  });
  // eslint-disable-next-line react/prop-types
  const ContextProvider = ({ children }) => (
    <Context1.Provider value="context1">
      <Context2.Provider value="context2">
        {children}
      </Context2.Provider>
    </Context1.Provider>
  );

  it('should provide props from contexts', () => {
    const TestBase = () => <div />;
    const Test = createComponentWithProps(TestBase);
    const tree = mount((<ContextProvider><Test /></ContextProvider>));

    expect(tree.find(TestBase).props())
      .toEqual({
        first: 'context1',
        second: 'context2',
      });
  });

  it('should keep component props if provide new props from contexts', () => {
    // eslint-disable-next-line react/prop-types
    const TestBase = ({ name }) => <div className={name} />;
    const Test = createComponentWithProps(TestBase);
    const tree = mount((<ContextProvider><Test name="Test" /></ContextProvider>));

    expect(tree.find(TestBase).props())
      .toEqual({
        first: 'context1',
        second: 'context2',
        name: 'Test',
      });
    expect(tree.find('.Test').exists())
      .toBeTruthy();
  });
});
