import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { CANCEL_BUTTON, DELETE_BUTTON, SAVE_BUTTON } from '@devexpress/dx-scheduler-core';
import { Layout, classes } from './layout';

describe('AppointmentForm command', () => {
  const defaultProps = {
    commandButtonComponent: () => null,
    getMessage: jest.fn(),
    onCommitButtonClick: jest.fn(),
    onCancelButtonClick: jest.fn(),
    onDeleteButtonClick: jest.fn(),
    showSaveButton: true,
  };

  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  describe('Layout', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Layout data={{ a: 1 }} {...defaultProps} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should pass className to the root element', () => {
      const tree = shallow((
        <Layout className="custom-class" {...defaultProps} />
      ));

      expect(tree.is(`.${classes.root}.custom-class.${classes.basic}`))
        .toBeTruthy();
    });

    it('should be full-size if fullSize is true', () => {
      const tree = shallow((
        <Layout fullSize {...defaultProps} />
      ));

      expect(tree.is(`.${classes.root}.${classes.fullSize}`))
        .toBeTruthy();
    });

    it('should render three Control Buttons', () => {
      const tree = shallow((
        <Layout className="custom-class" {...defaultProps} />
      ));

      const buttons = tree.find(defaultProps.commandButtonComponent);
      expect(buttons).toHaveLength(3);
      expect(buttons.at(0).prop('id'))
        .toEqual(CANCEL_BUTTON);
      expect(buttons.at(1).prop('id'))
        .toEqual(DELETE_BUTTON);
      expect(buttons.at(2).prop('id'))
        .toEqual(SAVE_BUTTON);
    });

    it('shouldn\'t render Save and Delete Buttons in readonly mode', () => {
      const tree = shallow((
        <Layout {...defaultProps} readOnly />
      ));

      const buttons = tree.find(defaultProps.commandButtonComponent);
      expect(buttons).toHaveLength(1);
      expect(buttons.at(0).prop('id'))
        .toEqual(CANCEL_BUTTON);
    });

    it('shouldn\'t render Delete Button if hideDeleteButton prop is true', () => {
      const tree = shallow((
        <Layout {...defaultProps} hideDeleteButton />
      ));

      const buttons = tree.find(defaultProps.commandButtonComponent);
      expect(buttons).toHaveLength(2);
      expect(buttons.at(0).prop('id'))
        .toEqual(CANCEL_BUTTON);
      expect(buttons.at(1).prop('id'))
        .toEqual(SAVE_BUTTON);
    });

    it('should call onCommitButtonClick', () => {
      const tree = shallow((
        <Layout {...defaultProps} />
      ));

      tree.find(defaultProps.commandButtonComponent).at(2).simulate('execute');
      expect(defaultProps.onCommitButtonClick)
        .toHaveBeenCalled();
    });

    it('should call onDeleteButtonClick', () => {
      const tree = shallow((
        <Layout {...defaultProps} />
      ));

      tree.find(defaultProps.commandButtonComponent).at(1).simulate('execute');
      expect(defaultProps.onDeleteButtonClick)
        .toHaveBeenCalled();
    });

    it('should call onCancelButtonClick', () => {
      const tree = shallow((
        <Layout {...defaultProps} />
      ));

      tree.find(defaultProps.commandButtonComponent).at(0).simulate('execute');
      expect(defaultProps.onCancelButtonClick)
        .toHaveBeenCalled();
    });

    it('should pass children into the root component', () => {
      const tree = shallow((
        <Layout {...defaultProps}>
          <div className="child" />
        </Layout>
      ));

      expect(tree.find('.child'))
        .toHaveLength(1);
    });
  });
});
