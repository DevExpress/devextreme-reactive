import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { CANCEL_BUTTON, DELETE_BUTTON, SAVE_BUTTON } from '@devexpress/dx-scheduler-core';
import { Layout } from './layout';

describe('AppointmentForm command', () => {
  const defaultProps = {
    commandButtonComponent: () => null,
    getMessage: jest.fn(),
    onCommitButtonClick: jest.fn(),
    onCancelButtonClick: jest.fn(),
    onDeleteButtonClick: jest.fn(),
  };
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<Layout><div /></Layout>);
    shallow = createShallow({ dive: true });
  });
  describe('Layout', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Layout data={{ a: 1 }} {...defaultProps}>
          <div />
        </Layout>
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should pass className to the root element', () => {
      const tree = shallow((
        <Layout className="custom-class" {...defaultProps}>
          <div />
        </Layout>
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.root}`))
        .toBeTruthy();
      expect(tree.is(`.${classes.basic}`))
        .toBeTruthy();
    });

    it('should be full-size if fullSize is true', () => {
      const tree = shallow((
        <Layout fullSize {...defaultProps}>
          <div />
        </Layout>
      ));

      expect(tree.is(`.${classes.root}`))
        .toBeTruthy();
      expect(tree.is(`.${classes.fullSize}`))
        .toBeTruthy();
    });

    it('should render three Control Buttons', () => {
      const tree = shallow((
        <Layout className="custom-class" {...defaultProps}>
          <div />
        </Layout>
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
        <Layout readOnly {...defaultProps}>
          <div />
        </Layout>
      ));

      const buttons = tree.find(defaultProps.commandButtonComponent);
      expect(buttons).toHaveLength(1);
      expect(buttons.at(0).prop('id'))
        .toEqual(CANCEL_BUTTON);
    });

    it('shouldn call onCommitButtonClick', () => {
      const tree = shallow((
        <Layout {...defaultProps}>
          <div />
        </Layout>
      ));

      tree.find(defaultProps.commandButtonComponent).at(2).simulate('execute');
      expect(defaultProps.onCommitButtonClick)
        .toHaveBeenCalled();
    });

    it('shouldn call onDeleteButtonClick', () => {
      const tree = shallow((
        <Layout {...defaultProps}>
          <div />
        </Layout>
      ));

      tree.find(defaultProps.commandButtonComponent).at(1).simulate('execute');
      expect(defaultProps.onDeleteButtonClick)
        .toHaveBeenCalled();
    });

    it('shouldn call onCancelButtonClick', () => {
      const tree = shallow((
        <Layout {...defaultProps}>
          <div />
        </Layout>
      ));

      tree.find(defaultProps.commandButtonComponent).at(0).simulate('execute');
      expect(defaultProps.onCancelButtonClick)
        .toHaveBeenCalled();
    });

    it('should pass children to the root component', () => {
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
