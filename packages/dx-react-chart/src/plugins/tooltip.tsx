import * as React from 'react';
import {
  Plugin,
  Getter,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
  withComponents,
  PluginComponents,
} from '@devexpress/dx-react-core';
import {
  getParameters,
  processHandleTooltip,
} from '@devexpress/dx-chart-core';
import { Target } from '../templates/tooltip/target';
import { RawTooltipProps, RawTooltipState, getPointerMoveHandlersFn } from '../types';

const dependencies = [{ name: 'EventTracker', optional: true }];

class RawTooltip extends React.PureComponent<RawTooltipProps, RawTooltipState> {
  static components: PluginComponents;
  getPointerMoveHandlers: getPointerMoveHandlersFn;
  targetElement: React.RefObject<SVGPathElement> | undefined;

  constructor(props) {
    super(props);
    this.state = {
      target: props.targetItem || props.defaultTargetItem,
    };
    this.targetElement = undefined;
    this.createTargetElement = this.createTargetElement.bind(this);
    this.getTargetElement = this.getTargetElement.bind(this);
    const handlePointerMove = this.handlePointerMove.bind(this);
    this.getPointerMoveHandlers = ({ pointerMoveHandlers = [] }) => [
      ...pointerMoveHandlers, handlePointerMove,
    ];
  }

  static getDerivedStateFromProps(props, state) {
    return { target: props.targetItem !== undefined ? props.targetItem : state.target };
  }

  getTargetElement() {
    return this.targetElement;
  }

  createTargetElement(ref) {
    this.targetElement = ref;
  }

  handlePointerMove({ targets }) {
    this.setState((
      { target: currentTarget },
      { onTargetItemChange },
    ) => {
      const target = processHandleTooltip(targets, currentTarget, onTargetItemChange);
      if (target === undefined) {
        return null;
      }
      return { target };
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
      <Plugin name="Tooltip" dependencies={dependencies}>
        <Getter name="pointerMoveHandlers" computed={this.getPointerMoveHandlers} />
        <Template name="series">
          <TemplatePlaceholder />
          <TemplateConnector>
            {
            ({ series }) => {
              if (!target) {
                return null;
              }
              const { text, element } = getParameters(series, target);
              return (
                <React.Fragment>
                  <TargetComponent
                    {...element}
                    componentRef={this.createTargetElement}
                  />
                  <OverlayComponent
                    key={`${target.series}${target.point}`}
                    target={this.getTargetElement}
                  >
                    <ContentComponent text={text} targetItem={target} />
                  </OverlayComponent>
                </React.Fragment>
              );
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

RawTooltip.components = {
  overlayComponent: 'Overlay',
  targetComponent: 'Target',
  contentComponent: 'Content',
};

export const Tooltip: React.ComponentType<RawTooltipProps> = withComponents({ Target })(RawTooltip);
