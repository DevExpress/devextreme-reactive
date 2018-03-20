import * as React from 'react';
import { shallow } from 'enzyme';
import { Label } from './label';

describe('Label', () => {
  it('should render text', () => {
    const tree = shallow((
      <Label
        x={1}
        y={2}
        text="a"
        alignmentBaseline="middle"
        textAnchor="end"
      />
    ));

    const {
      x, y, alignmentBaseline, textAnchor,
    } = tree.find('text').props();
    expect(x).toBe(1);
    expect(y).toBe(2);
    expect(alignmentBaseline).toBe('middle');
    expect(textAnchor).toBe('end');
    expect(tree.text()).toBe('a');
  });
});
