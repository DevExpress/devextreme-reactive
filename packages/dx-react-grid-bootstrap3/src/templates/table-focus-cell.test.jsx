import * as React from 'react';
import { mount } from 'enzyme';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';
import { FocusCell } from './table-focus-cell';

jest.mock('@devexpress/dx-react-grid', () => ({
  withKeyboardNavigation: jest.fn().mockReturnValue(x => x),
}));

const defaultProps = {
  component: () => <span />,
};

describe('FocusCell', () => {
  it('should be rendered', () => {
    const tree = mount((
      <FocusCell {...defaultProps} />
    ));

    expect(tree.find(defaultProps.component)).toBeTruthy();
  });

  it('should call withKeyboardNavigation', () => {
    mount((
      <FocusCell {...defaultProps} />
    ));

    expect(withKeyboardNavigation).toBeCalled();
  });

  it('should apply default styles', () => {
    const tree = mount((
      <FocusCell {...defaultProps} />
    ));

    expect(tree.find(defaultProps.component).props().style).toEqual({
      outline: 'none',
    });
  });

  it('should apply styles if focus = true', () => {
    const tree = mount((
      <FocusCell {...defaultProps} focused />
    ));

    expect(tree.find(defaultProps.component).props().style).toEqual({
      borderBottom: '1px solid #337ab7',
      borderLeft: '1px solid #337ab7',
      borderRight: '1px solid #337ab7',
      borderTop: '1px solid #337ab7',
      outline: 'none',
    });
  });
});
