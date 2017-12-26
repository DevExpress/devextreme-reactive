import {
  createStateHelper,
} from './state-helper';

describe('createStateHelper helper', () => {
  const getComponent = () => ({
    state: {},
    getState: jest.fn(),
    notifyStateChange: jest.fn(),
    setState: jest.fn(),
  });

  // it('should call reducer', () => {
  //   const component = getComponent();
  //   component.getState.mockImplementation(() => ({ a: 1 }));
  //   component.setState.mockImplementation(stateUpdater => stateUpdater({ a: 1 }));

  //   const stateHelper = createStateHelper(component);
  //   const payload = { a: 2, b: 1 };
  //   const reduce = jest.fn().mockImplementation(() => payload);
  //   const callback = jest.fn();
  //   stateHelper.applyReducer(reduce, payload, callback);

  //   expect(reduce).toBeCalledWith({ a: 1 }, payload);
  //   expect(callback).toBeCalledWith({ a: 2, b: 1 }, { a: 1 });
  // });

  it('should call notifyStateChange with correct state', () => {
    const component = getComponent();
    component.getState
      .mockImplementationOnce(() => ({ a: [], b: [0] }))
      .mockImplementationOnce(() => ({ a: [], b: [] }));

    component.setState
      .mockImplementationOnce(stateUpdater => stateUpdater({ a: [], b: [0] }))
      .mockImplementationOnce(stateUpdater => stateUpdater({ a: [], b: [] }));

    const stateHelper = createStateHelper(component);

    const reduce = jest.fn()
      .mockImplementationOnce(() => ({ a: [] }))
      .mockImplementationOnce(() => ({ b: [] }));


    stateHelper.applyReducer(reduce);
    stateHelper.applyReducer(reduce);

    expect(component.notifyStateChange).toBeCalledWith(expect.any(Object), { a: [], b: [0] });
    // expect(component.notifyStateChange.mock.calls.length).toBe(1);
    // expect(component.notifyStateChange).toBeCalledWith(expect.any(Object), { a: 2 });
  });
});
