import * as React from 'react';
import { mount } from 'enzyme';
import { InlineSummaryItem } from './inline-summary-item';

describe('InlineSummaryItem', () => {
  const defaultProps = {
    summary: {
      messageKey: 'count',
      columnTitle: 'a',
      component: () => <span className="test">|SummaryComponent</span>,
    },
    getMessage: jest.fn().mockReturnValue('getMessage'),
  };

  it('should render summary component', () => {
    const tree = mount(<InlineSummaryItem {...defaultProps} />);

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should use getMessage function', () => {
    mount(<InlineSummaryItem {...defaultProps} />);

    expect(defaultProps.getMessage)
      .toBeCalledWith('count', { columnTitle: 'a' });
  });

  it('should render correct text', () => {
    const tree = mount((
      <span>
        <InlineSummaryItem {...defaultProps} />
      </span>
    ));

    expect(tree.text())
      .toBe('getMessage|SummaryComponent');
  });
});
