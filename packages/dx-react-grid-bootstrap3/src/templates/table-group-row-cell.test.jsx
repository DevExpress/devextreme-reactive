import React from 'react';
import { mount, shallow } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { TableGroupCell } from './table-group-row-cell';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

describe('TableCell', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });

  afterAll(() => {
    resetConsole();
  });

  it('should render column title and value', () => {
    const tree = mount((
      <TableGroupCell
        column={{ title: 'Title' }}
        row={{ value: 'Value' }}
      />
    ));

    expect(tree.text())
      .toMatch(/Title.*Value/);
  });

  it('should render children if passed', () => {
    const tree = mount((
      <TableGroupCell>
        <span className="test" />
      </TableGroupCell>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('can get focus', () => {
    const tree = mount((
      <TableGroupCell />
    ));

    expect(tree.find('i').prop('tabIndex'))
      .toBe(0);
  });

  it('should handle the "Enter" and "Space" keys down', () => {
    const toggleGroupExpanded = jest.fn();
    const tree = mount((
      <TableGroupCell
        toggleGroupExpanded={toggleGroupExpanded}
      />
    ));
    const targetElement = tree.find('i');

    targetElement.simulate('keydown', { keyCode: ENTER_KEY_CODE });
    expect(toggleGroupExpanded)
      .toHaveBeenCalled();

    toggleGroupExpanded.mockClear();
    targetElement.simulate('keydown', { keyCode: SPACE_KEY_CODE });
    expect(toggleGroupExpanded)
      .toHaveBeenCalled();

    toggleGroupExpanded.mockClear();
    targetElement.simulate('keydown', { keyCode: 51 });
    expect(toggleGroupExpanded)
      .not.toHaveBeenCalled();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableGroupCell className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });
});
