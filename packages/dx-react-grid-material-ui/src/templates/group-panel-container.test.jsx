import * as React from 'react';
import { createShallow, getClasses } from '@devexpress/dx-testing';
import { GroupPanelContainer } from './group-panel-container';

describe('GroupPanelContainer', () => {
  let shallow;
  let classes;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<GroupPanelContainer />);
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <GroupPanelContainer
        data={{ a: 1 }}
      />
    ));

    expect(tree.prop('data'))
      .toEqual({ a: 1 });
  });

  it('should add the passed className to the root element', () => {
    const tree = shallow((
      <GroupPanelContainer
        className="custom-class"
      />
    ));

    expect(tree.hasClass('custom-class'))
      .toBeTruthy();
    expect(tree.hasClass(classes.panel))
      .toBeTruthy();
  });
});
