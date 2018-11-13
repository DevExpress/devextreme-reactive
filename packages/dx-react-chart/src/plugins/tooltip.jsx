import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  Getter,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { getParameters } from '@devexpress/dx-chart-core';
import { Target } from '../templates/tooltip/target-component';
import { withComponents } from '../utils';

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
      overlayComponent: OverlayComponent,
      targetComponent: TargetComponent,
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
              const { text, element } = getParameters(series, targets);
              return (
                <React.Fragment>
                  <TargetComponent
                    {...element}
                    componentRef={(ref) => { this.targetElement = ref; }}
                  />
                  <OverlayComponent
                    key={text}
                    target={this.targetElement}
                    visible={visibility}
                  >
                    {text}
                  </OverlayComponent>
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
  overlayComponent: PropTypes.func.isRequired,
  targetComponent: PropTypes.func.isRequired,
};

RawTooltip.components = {
  overlayComponent: 'Overlay',
  targetComponent: 'Target',
};

export const Tooltip = withComponents({ Target })(RawTooltip);
