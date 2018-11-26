import * as React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import Typography from '@material-ui/core/Typography';
import { Content } from './content';

describe('Content', () => {
  const defaultProps = {
    text: 'tooltip-text',
  };
  const mount = createMount({ dive: true });

  it('should render content', () => {
    const tree = mount((
      <Content
        {...defaultProps}
      />
    ));
    expect(tree.find(Typography).props().children)
      .toBe('tooltip-text');
  });
});
