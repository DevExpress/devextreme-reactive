import * as React from 'react';
// import { createShallow } from 'material-ui/test-utils';
import { shallow, mount } from 'enzyme';
import { ListItemText } from 'material-ui/List';
import { Label } from './label';

describe('Label', () => {
  it('should render ListItemText', () => {
    const tree = shallow((
      <Label
        text="a"
      />
    ));

    expect(tree.find(ListItemText).exists()).toBeTruthy();
  });

  it('should render text', () => {
    const tree = mount((
      <Label
        text="a"
      />
    ));

    expect(tree.find(ListItemText).text().trim())
      .toBe('a');
  });
});
