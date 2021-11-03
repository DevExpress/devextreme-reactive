import * as React from 'react';
import { createShallow, createMount } from '@devexpress/dx-testing';
import IconButton from '@mui/material/IconButton';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import { TableDetailToggleCell, classes } from './table-detail-toggle-cell';

describe('TableDetailToggleCell', () => {
  let shallow;
  let mount;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
  });
  afterAll(() => {
    mount.cleanUp();
  });

  it('should render IconButton', () => {
    const tree = mount((
      <TableDetailToggleCell />
    ));

    expect(tree.find(IconButton).exists())
      .toBeTruthy();
  });

  it('should handle click with stopPropagation', () => {
    const onToggle = jest.fn();
    const mockEvent = {
      stopPropagation: jest.fn(),
    };
    const tree = mount((
      <TableDetailToggleCell
        onToggle={onToggle}
      />
    ));

    const buttonClickHandler = tree.find(IconButton).prop('onClick');

    buttonClickHandler(mockEvent);
    expect(onToggle)
      .toHaveBeenCalled();
    expect(mockEvent.stopPropagation)
      .toHaveBeenCalled();
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableDetailToggleCell
        className="custom-class"
      />
    ));

    expect(tree.is(`.${classes.toggleCell}`))
      .toBeTruthy();
    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableDetailToggleCell
        data={{ a: 1 }}
      />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });

  it('should correct render icon', () => {
    let tree = shallow((
      <TableDetailToggleCell expanded />
    ));

    expect(tree.find(ExpandLess).exists())
      .toBeTruthy();
    expect(tree.find(ExpandMore).exists())
      .toBeFalsy();

    tree = shallow((
      <TableDetailToggleCell />
    ));

    expect(tree.find(ExpandLess).exists())
      .toBeFalsy();
    expect(tree.find(ExpandMore).exists())
      .toBeTruthy();
  });
});
