import * as React from 'react';
import { createShallow, getClasses } from '@mui/material/test-utils';
import { Layout } from './layout';

describe('ConfirmationDialog', () => {
  let shallow;
  let classes;
  const defaultProps = {
    handleCancel: jest.fn(),
    handleConfirm: jest.fn(),
    getMessage: jest.fn(),
    // eslint-disable-next-line react/prop-types
    buttonComponent: ({ children }) => <div>{children}</div>,
  };
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Layout {...defaultProps} />);
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
    it('should render its elements properly', () => {
      const tree = shallow((
        <Layout {...defaultProps} />
      ));

      expect(tree.find(`.${classes.title}`).exists())
        .toBeTruthy();
    });
    it('should handle click on close button', () => {
      const tree = shallow((
        <Layout {...defaultProps} />
      ));

      const closeButton = tree.find(defaultProps.buttonComponent).at(0);
      closeButton.simulate('click');
      expect(defaultProps.handleCancel)
        .toBeCalled();
    });
    it('should handle click on confirm button', () => {
      const tree = shallow((
        <Layout {...defaultProps} />
      ));

      const closeButton = tree.find(defaultProps.buttonComponent).at(1);
      closeButton.simulate('click');
      expect(defaultProps.handleConfirm)
        .toBeCalled();
    });
    it('should render messages', () => {
      const tree = shallow((
        <Layout {...defaultProps} title="custom-text" />
      ));

      expect(defaultProps.getMessage)
        .toBeCalledTimes(3);
      expect(defaultProps.getMessage)
        .toBeCalledWith('confirmCancelMessage');
      expect(defaultProps.getMessage)
        .toBeCalledWith('cancelButton');
      expect(defaultProps.getMessage)
        .toBeCalledWith('discardButton');

      tree.setProps({ isDeleting: true });
      tree.update();

      expect(defaultProps.getMessage)
        .toBeCalledWith('confirmDeleteMessage');
      expect(defaultProps.getMessage)
        .toBeCalledWith('deleteButton');
    });
  });
});
