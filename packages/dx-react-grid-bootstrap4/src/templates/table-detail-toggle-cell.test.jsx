import * as React from 'react';
import { shallow } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { TableDetailToggleCell } from './table-detail-toggle-cell';

describe('TableDetailToggleCell', () => {
  let resetConsole;
  const ENTER_KEY_CODE = 13;
  const SPACE_KEY_CODE = 32;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should handle click with stopPropagation', () => {
    const onToggle = jest.fn();
    const mockEvent = {
      stopPropagation: jest.fn(),
    };
    const tree = shallow((
      <TableDetailToggleCell
        onToggle={onToggle}
      />
    ));

    const buttonClickHandler = tree.find('td').prop('onClick');

    buttonClickHandler(mockEvent);
    expect(onToggle)
      .toHaveBeenCalled();
    expect(mockEvent.stopPropagation)
      .toHaveBeenCalled();
  });

  it('can get focus', () => {
    const tree = shallow((
      <TableDetailToggleCell />
    ));

    expect(tree.find('span').prop('tabIndex'))
      .toBe(0);
  });

  it('should handle the "Enter" and "Space" keys down', () => {
    const onToggle = jest.fn();
    const tree = shallow((
      <TableDetailToggleCell
        onToggle={onToggle}
      />
    ));

    const targetElement = tree.find('span');
    targetElement.simulate('keydown', { preventDefault: jest.fn(), keyCode: ENTER_KEY_CODE });
    expect(onToggle)
      .toHaveBeenCalled();

    onToggle.mockClear();
    targetElement.simulate('keydown', { preventDefault: jest.fn(), keyCode: SPACE_KEY_CODE });
    expect(onToggle)
      .toHaveBeenCalled();

    onToggle.mockClear();
    targetElement.simulate('keydown', { preventDefault: jest.fn(), keyCode: 55 });
    expect(onToggle)
      .not.toHaveBeenCalled();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableDetailToggleCell
        data={{ a: 1 }}
      />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });

  it('should pass custom class to the root element', () => {
    const tree = shallow((
      <TableDetailToggleCell className="custom-class" />
    ));
    expect(tree.find('td').is('.align-middle.dx-rg-bs4-cursor-pointer.custom-class'))
      .toBeTruthy();
  });
});
