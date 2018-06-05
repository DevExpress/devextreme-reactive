import * as React from 'react';
import { shallow } from 'enzyme';
import { Icon } from './icon';

describe('Icon', () => {
  it('should render default icon if unknown type is specified', () => {
    const tree = shallow(<Icon />);
    expect(tree.find('i.glyphicon').exists())
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    let tree = shallow(<Icon data={{ a: 1 }} />);
    expect(tree.props().data)
      .toMatchObject({ a: 1 });

    tree = shallow(<Icon type="contains" data={{ a: 1 }} />);
    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });

  it('should pass styles to the root element', () => {
    let tree = shallow(<Icon style={{ color: 'red' }} />);
    expect(tree.props().style)
      .toMatchObject({
        color: 'red',
      });

    tree = shallow(<Icon type="contains" style={{ color: 'red' }} />);
    expect(tree.props().style)
      .toMatchObject({
        width: 14,
        color: 'red',
      });
  });
});
