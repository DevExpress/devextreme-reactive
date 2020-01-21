import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { ExportButton } from './export-button';

describe('ExportButton', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  const defaultProps = {
    onClick: () => {},
    getMessage: key => key,
    className: 'export-button',
  };

  it('should render `export` message', () => {
    const tree = shallow((
      <ExportButton
        {...defaultProps}
      />
    ));

    expect(tree.find('.export-button').text())
      .toBe('export');
  });

  it('should handle click events', () => {
    const tree = shallow((
      <ExportButton
        {...defaultProps}
      />
    ));

    expect(tree.find('.export-button').prop('onClick'))
      .toBe(defaultProps.onClick);
  });

  it('should assign rest props to the Button', () => {
    const tree = shallow((
      <ExportButton
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.find('.export-button').prop('data'))
      .toEqual({ a: 1 });
  });
});
