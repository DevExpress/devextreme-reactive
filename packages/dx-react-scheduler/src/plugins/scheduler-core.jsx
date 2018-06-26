import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';

export class SchedulerCore extends React.PureComponent {
  render() {
    const {
      data,
      currentDate,
      rootComponent: Root,
    } = this.props;
    return (
      <Plugin>
        <Getter name="data" value={data} />
        <Getter name="currentDate" value={currentDate} />
        <Template name="root">
          <Root>
            <TemplatePlaceholder name="header" />
            <TemplatePlaceholder name="body" />
            <TemplatePlaceholder name="footer" />
          </Root>
        </Template>
      </Plugin>
    );
  }
}

SchedulerCore.propTypes = {
  data: PropTypes.array.isRequired,
  rootComponent: PropTypes.func.isRequired,
  currentDate: PropTypes.instanceOf(Date).isRequired,
};
