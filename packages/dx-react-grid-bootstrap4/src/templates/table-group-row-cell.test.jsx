import * as React from 'react';
import { shallow } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { TableGroupCell } from './table-group-row-cell';

describe('TableGroupRowCell', () => {
  let resetConsole;
  const ENTER_KEY_CODE = 13;
  const SPACE_KEY_CODE = 32;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should render column title and value', () => {
    const tree = shallow((
      <TableGroupCell
        column={{ title: 'Title' }}
        row={{ value: 'Value' }}
      />
    ));

    expect(tree.text())
      .toMatch(/Title.*Value/);
  });

  it('should render children if passed', () => {
    const tree = shallow((
      <TableGroupCell>
        <span className="test" />
      </TableGroupCell>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('can get focus', () => {
    const tree = shallow((
      <TableGroupCell />
    ));

    expect(tree.find('span').prop('tabIndex'))
      .toBe(0);
  });

  it('should handle the "Enter" and "Space" keys down', () => {
    const onToggle = jest.fn();
    const tree = shallow((
      <TableGroupCell
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
    targetElement.simulate('keydown', { keyCode: 51 });
    expect(onToggle)
      .not.toHaveBeenCalled();
  });

  it('should pass custom class to the root element', () => {
    const tree = shallow((
      <TableGroupCell className="custom-class" />
    ));

    expect(tree.is('.dx-rg-bs4-cursor-pointer.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableGroupCell data={{ a: 1 }} />
    ));

    expect(tree.prop('data'))
      .toEqual({ a: 1 });
  });
});
