import React from 'react';
import { shallow } from 'enzyme';
import { TableContainer } from './table-container';

describe('TableContainer', () => {
  it('should apply custom styles', () => {
    const tree = shallow((
      <TableContainer
        style={{ color: 'red' }}
      >
        <span />
      </TableContainer>
    ));

    expect(tree.find('div').prop('style'))
      .toMatchObject({
        color: 'red',
      });
  });
});
