import * as React from 'react';
import { mount } from 'enzyme';
import { Label } from './label';

const defaultProps = { text: 'a' };

describe('Label', () => {
  it('should render text', () => {
    const tree = mount((
      <Label {...defaultProps} />
    ));

    expect(tree.text())
      .toBe('a');
    expect(tree.find('span'))
      .toBeDefined();
  });

  it('should pass the rest property to the root element', () => {
    const tree = mount(<Label {...defaultProps} custom="test" />);

    const { custom } = tree.find('span').props();

    expect(custom).toEqual('test');
  });

  it('should pass the className prop to the root element', () => {
    const tree = mount((
      <Label {...defaultProps} className="custom-class">
        <div />
      </Label>
    ));

    expect(tree.find('span').is('.custom-class.text-body.pl-2.pr-2'))
      .toBeTruthy();
  });
});
