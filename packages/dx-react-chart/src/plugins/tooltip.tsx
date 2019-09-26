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
import { getParameters, processHandleTooltip, createReference } from '@devexpress/dx-chart-core';
import { Target } from '../templates/tooltip/target';
import { TooltipProps, TooltipState, GetPointerMoveHandlersFn } from '../types';

const dependencies = [{ name: 'EventTracker', optional: true }];

class RawTooltip extends React.PureComponent<TooltipProps, TooltipState> {
  static components: PluginComponents = {
    overlayComponent: 'Overlay',
    targetComponent: 'Target',
    contentComponent: 'Content',
    arrowComponent: 'Arrow',
    sheetComponent: 'Sheet',
  };
  getPointerMoveHandlers: GetPointerMoveHandlersFn;

  constructor(props: TooltipProps) {
    super(props);
    this.state = {
      target: props.targetItem || props.defaultTargetItem,
    };
    const handlePointerMove = this.handlePointerMove.bind(this);
    this.getPointerMoveHandlers = ({ pointerMoveHandlers = [] }) => [
      ...pointerMoveHandlers, handlePointerMove,
    ];
  }

  static getDerivedStateFromProps(props: TooltipProps, state: TooltipState): TooltipState {
    return { target: props.targetItem !== undefined ? props.targetItem : state.target };
  }

  handlePointerMove({ targets }) {
    this.setState((
      { target: currentTarget },
      { onTargetItemChange },
    ) => {
      const target = processHandleTooltip(targets, currentTarget!, onTargetItemChange);
      if (target === undefined) {
        return null;
      }
      return { target: target! };
    });
  }

  render() {
    const {
      overlayComponent: OverlayComponent,
      contentComponent: ContentComponent,
      sheetComponent: SheetComponent,
      arrowComponent,
    } = this.props;
    const { target } = this.state;
    return (
      <Plugin name="Tooltip" dependencies={dependencies}>
        <Getter name="pointerMoveHandlers" computed={this.getPointerMoveHandlers} />
        <Template name="series">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ series, rootRef, rotated }) => {
              if (!target) {
                return null;
              }
              const { text, element } = getParameters(series, target);
              return (
                <OverlayComponent
                  key={`${target.series}${target.point}`}
                  target={createReference(element, rootRef)}
                  rotated={rotated}
                  arrowComponent={arrowComponent}
                >
                  <SheetComponent>
                    <ContentComponent text={text} targetItem={target} />
                  </SheetComponent>
                </OverlayComponent>
              );
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

export const Tooltip: React.ComponentType<TooltipProps> = withComponents({ Target })(RawTooltip);
