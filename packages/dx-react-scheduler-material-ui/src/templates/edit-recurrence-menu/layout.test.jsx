import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { Layout } from './layout';

describe('EditRecurrenceMenu', () => {
  let shallow;
  const defaultProps = {
    availableOperations: [{ value: '1', title: 'operation1' }],
    handleClose: jest.fn(),
    commit: jest.fn(),
    getMessage: jest.fn(),
    // eslint-disable-next-line react/prop-types
    buttonComponent: ({ children }) => <div>{children}</div>,
  };
  beforeAll(() => {
    shallow = createShallow();
  });
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('Layout', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Layout {...defaultProps} data={{ testData: 'testData' }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ testData: 'testData' });
    });
    it('should handle click on close button', () => {
      const tree = shallow((
        <Layout {...defaultProps} />
      ));

      const closeButton = tree.find(defaultProps.buttonComponent).at(0);
      closeButton.simulate('click');
      expect(defaultProps.handleClose)
        .toBeCalled();
    });
    it('should handle click on commit button', () => {
      const tree = shallow((
        <Layout {...defaultProps} />
      ));

      const closeButton = tree.find(defaultProps.buttonComponent).at(1);
      closeButton.simulate('click');
      expect(defaultProps.commit)
        .toBeCalled();
    });
    it('should render messages', () => {
      const tree = shallow((
        <Layout {...defaultProps} title="custom-text" />
      ));

      expect(defaultProps.getMessage)
        .toBeCalledTimes(3);
      expect(defaultProps.getMessage)
        .toBeCalledWith('menuEditTitle');
      expect(defaultProps.getMessage)
        .toBeCalledWith('cancelButton');
      expect(defaultProps.getMessage)
        .toBeCalledWith('commitButton');

      tree.setProps({ isDeleting: true });
      tree.update();

      expect(defaultProps.getMessage)
        .toBeCalledWith('menuDeleteTitle');
    });
  });
});
