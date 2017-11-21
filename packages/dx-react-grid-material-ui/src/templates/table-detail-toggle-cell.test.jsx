import React from 'react';
import { createShallow } from 'material-ui/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { IconButton } from 'material-ui';
import { TableDetailToggleCell } from './table-detail-toggle-cell';

describe('TableDetailToggleCell', () => {
  let resetConsole;
  let shallow;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting', 'SheetsRegistry'] });
    shallow = createShallow({ dive: true });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should render IconButton', () => {
    const tree = shallow((
      <TableDetailToggleCell />
    ));

    expect(tree.find(IconButton).exists())
      .toBeTruthy();
  });

  it('should handle click with stopPropagation', () => {
    const toggleExpanded = jest.fn();
    const mockEvent = {
      stopPropagation: jest.fn(),
    };
    const tree = shallow((
      <TableDetailToggleCell
        toggleExpanded={toggleExpanded}
      />
    ));

    const buttonClickHandler = tree.find(IconButton).prop('onClick');

    buttonClickHandler(mockEvent);
    expect(toggleExpanded)
      .toHaveBeenCalled();
    expect(mockEvent.stopPropagation)
      .toHaveBeenCalled();
  });
});
