import * as React from 'react';
import { shallow } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { ToggleButton } from './toggle-button';

const defaultProps = {
  visible: true,
  expanded: false,
  onToggle: () => {},
};

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

describe('ToggleButton', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should handle click', () => {
    const onToggle = jest.fn();
    const tree = shallow((
      <ToggleButton
        {...defaultProps}
        onToggle={onToggle}
      />
    ));

    tree.find('i').simulate('click', { stopPropagation: () => {} });
    expect(onToggle)
      .toHaveBeenCalled();
  });

  it('can get focus', () => {
    const tree = shallow((
      <ToggleButton
        {...defaultProps}
      />
    ));

    expect(tree.find('i').prop('tabIndex'))
      .toBe(0);
  });

  it('should handle the "Enter" and "Space" keys down', () => {
    const onToggle = jest.fn();
    const tree = shallow((
      <ToggleButton
        {...defaultProps}
        onToggle={onToggle}
      />
    ));

    const targetElement = tree.find('i');
    targetElement.simulate('keydown', { keyCode: ENTER_KEY_CODE, preventDefault: () => {} });
    expect(onToggle)
      .toHaveBeenCalled();

    onToggle.mockClear();
    targetElement.simulate('keydown', { keyCode: SPACE_KEY_CODE, preventDefault: () => {} });
    expect(onToggle)
      .toHaveBeenCalled();

    onToggle.mockClear();
    targetElement.simulate('keydown', { keyCode: 51, preventDefault: () => {} });
    expect(onToggle)
      .not.toHaveBeenCalled();
  });

  it('should pass style to the root element', () => {
    const tree = shallow((
      <ToggleButton
        {...defaultProps}
        style={{ color: 'gray' }}
      />
    ));

    expect(tree.prop('style'))
      .toMatchObject({ color: 'gray' });
  });

  it('should pass style to the root element', () => {
    const tree = shallow((
      <ToggleButton
        {...defaultProps}
        style={{ color: 'gray' }}
      />
    ));

    expect(tree.prop('style'))
      .toMatchObject({ color: 'gray' });
  });

  it('should pass className to the root element', () => {
    const tree = shallow((
      <ToggleButton
        {...defaultProps}
        className="test"
      />
    ));

    expect(tree.prop('className'))
      .toContain('test');
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <ToggleButton
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });

  describe('hidden', () => {
    it('should not handle click', () => {
      const onToggle = jest.fn();
      const tree = shallow((
        <ToggleButton
          {...defaultProps}
          visible={false}
          onToggle={onToggle}
        />
      ));

      tree.find('i').simulate('click', { stopPropagation: () => {} });
      expect(onToggle)
        .not.toHaveBeenCalled();
    });

    it('can not get focus', () => {
      const tree = shallow((
        <ToggleButton
          {...defaultProps}
          visible={false}
        />
      ));

      expect(tree.find('i').prop('tabIndex'))
        .toBe(undefined);
    });
  });
});
