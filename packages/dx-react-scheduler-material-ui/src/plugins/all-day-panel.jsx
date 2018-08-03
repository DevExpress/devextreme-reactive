import * as React from 'react';
import * as PropTypes from 'prop-types';
import { AllDayPanel as AllDayPanelBase } from '@devexpress/dx-react-scheduler';
import { Container } from '../templates/appointment/container';
import { Layout } from '../templates/all-day-panel/layout';
import { Cell } from '../templates/all-day-panel/cell';
import { Row } from '../templates/all-day-panel/row';
import { Text } from '../templates/all-day-panel/text';

const defaultMessages = {
  allDay: 'All Day',
};

export class AllDayPanel extends React.PureComponent {
  render() {
    const { messages, ...restProps } = this.props;
    return (
      <AllDayPanelBase
        containerComponent={Container}
        layoutComponent={Layout}
        cellComponent={Cell}
        rowComponent={Row}
        textComponent={Text}
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  }
}

AllDayPanel.propTypes = {
  messages: PropTypes.shape({
    allDay: PropTypes.string,
  }),
};

AllDayPanel.defaultProps = {
  messages: {},
};
