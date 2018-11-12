import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  Getter,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { FakeElement } from '../templates/fake-element';
import { withComponents } from '../utils';

const getParameters = (currentSeries, targets) => (
  targets ? currentSeries.getTargetElement(targets[0].point, currentSeries) : {}
);

class RawTooltip extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      targets: null,
    };
    const handlePointerMove = this.handlePointerMove.bind(this);
    this.getPointerMoveHandlers = ({ pointerMoveHandlers }) => [
      ...pointerMoveHandlers, handlePointerMove,
    ];
  }

  handlePointerMove({ targets }) {
    if (!targets.length || targets[0].point === undefined) {
      this.setState({
        visibility: false,
        targets: null,
      });
    } else {
      this.setState({
        visibility: true,
        targets,
      });
    }
  }

  render() {
    const {
      popoverComponent: TooltipComponent,
      fakeComponent: FakeComponent,
    } = this.props;
    const {
      targets,
      visibility,
    } = this.state;
    return (
      <Plugin name="Tooltip">
        <Getter name="pointerMoveHandlers" computed={this.getPointerMoveHandlers} />
        <Template name="series">
          <TemplatePlaceholder />
          <TemplateConnector>
            {
            ({ series }) => {
              const currentSeries = targets ? series
                .find(({ name }) => targets[0].series === name) : undefined;
              const text = targets ? `${targets[0].series}: ${targets[0].point}` : '';
              return (
                <React.Fragment>
                  <FakeComponent
                    {...getParameters(currentSeries, targets)}
                    buttonRef={(ref) => { this.targetElement = ref; }}
                  />
                  <TooltipComponent
                    key={text}
                    target={this.targetElement}
                    visible={visibility}
                  >
                    {text}
                  </TooltipComponent>
                </React.Fragment>
              );
            }
          }
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

RawTooltip.propTypes = {
  popoverComponent: PropTypes.func.isRequired,
  fakeComponent: PropTypes.func.isRequired,
  targets: PropTypes.array,
  visible: PropTypes.bool.isRequired,
};

RawTooltip.defaultProps = {
  targets: null,
};

RawTooltip.components = {
  popoverComponent: 'Overlay',
  fakeComponent: 'FakeElement',
};

export const Tooltip = withComponents({ FakeElement })(RawTooltip);
