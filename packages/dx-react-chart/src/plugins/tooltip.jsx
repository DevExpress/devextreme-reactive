import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  Getter,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
  withComponents,
} from '@devexpress/dx-react-core';
import { getParameters, processPointerMove } from '@devexpress/dx-chart-core';
import { Target } from '../templates/tooltip/target';

class RawTooltip extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      target: props.targetItem || props.defaultTargetItem,
    };
    this.getTargetElement = this.getTargetElement.bind(this);
    const handlePointerMove = this.handlePointerMove.bind(this);
    this.getPointerMoveHandlers = ({ pointerMoveHandlers }) => [
      ...pointerMoveHandlers, handlePointerMove,
    ];
  }

  getTargetElement() {
    return this.targetElement;
  }

  handlePointerMove({ targets }) {
    this.setState(({ target: currentTarget }, { onTargetItemChange }) => {
      const target = processPointerMove(targets, currentTarget, onTargetItemChange);
      if (target !== undefined) {
        if (target && target.point === undefined) {
          return { target: null };
        }
        return { target };
      }
      return { target: currentTarget };
    });
  }

  render() {
    const {
      overlayComponent: OverlayComponent,
      targetComponent: TargetComponent,
      contentComponent: ContentComponent,
    } = this.props;
    const {
      target,
    } = this.state;
    return (
      <Plugin name="Tooltip">
        <Getter name="pointerMoveHandlers" computed={this.getPointerMoveHandlers} />
        <Template name="series">
          <TemplatePlaceholder />
          <TemplateConnector>
            {
            ({ series }) => {
              const { text, element } = getParameters(series, target);
              return (
                <React.Fragment>
                  <TargetComponent
                    {...element}
                    componentRef={(ref) => { this.targetElement = ref; }}
                  />
                  <OverlayComponent
                    key={text}
                    target={this.getTargetElement}
                    visible={!!target}
                  >
                    <ContentComponent text={text} targetItem={target} />
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
  defaultTargetItem: PropTypes.shape({
    series: PropTypes.string.isRequired,
    point: PropTypes.number.isRequired,
  }),
  targetItem: PropTypes.shape({
    series: PropTypes.string.isRequired,
    point: PropTypes.number.isRequired,
  }),
  onTargetItemChange: PropTypes.func,
  overlayComponent: PropTypes.func.isRequired,
  targetComponent: PropTypes.func.isRequired,
  contentComponent: PropTypes.func.isRequired,
};

RawTooltip.defaultProps = {
  defaultTargetItem: undefined,
  targetItem: undefined,
  onTargetItemChange: undefined,
};

RawTooltip.components = {
  overlayComponent: 'Overlay',
  targetComponent: 'Target',
  contentComponent: 'Content',
};

export const Tooltip = withComponents({ Target })(RawTooltip);
