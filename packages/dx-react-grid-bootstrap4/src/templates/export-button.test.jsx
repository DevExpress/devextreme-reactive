import * as React from 'react';
import { shallow } from 'enzyme';
import { ExportButton } from './export-button';

describe('ExportButton', () => {
  const defaultProps = {
    onClick: () => {},
    getMessage: key => key,
  };

  it('should render `export` message', () => {
    const tree = shallow((
      <ExportButton
        {...defaultProps}
      />
    ));

    expect(tree.find('.btn').text())
      .toBe('export');
  });

  it('should handle click events', () => {
    const tree = shallow((
      <ExportButton
        {...defaultProps}
      />
    ));

    expect(tree.find('.btn').prop('onClick'))
      .toBe(defaultProps.onClick);
  });

  it('should assign rest props to the Button', () => {
    const tree = shallow((
      <ExportButton
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.find('.btn').prop('data'))
      .toEqual({ a: 1 });
  });

  it('should pass the className prop to the button', () => {
    const tree = shallow((
      <ExportButton
        {...defaultProps}
        className="custom"
      />
    ));

    expect(tree.find('.btn').hasClass('custom'))
      .toBeTruthy();
  });
});
