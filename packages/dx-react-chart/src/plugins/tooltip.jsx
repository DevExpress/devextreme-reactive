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
import { getParameters, processHandleTooltip, createReference } from '@devexpress/dx-chart-core';
import { Target } from '../templates/tooltip/target';

const dependencies = [{ name: 'EventTracker', optional: true }];

class RawTooltip extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      target: props.targetItem || props.defaultTargetItem,
    };
    const handlePointerMove = this.handlePointerMove.bind(this);
    this.getPointerMoveHandlers = ({ pointerMoveHandlers = [] }) => [
      ...pointerMoveHandlers, handlePointerMove,
    ];
  }

  static getDerivedStateFromProps(props, state) {
    return { target: props.targetItem !== undefined ? props.targetItem : state.target };
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
      contentComponent: ContentComponent,
    } = this.props;
    const { target } = this.state;
    return (
      <Plugin name="Tooltip" dependencies={dependencies}>
        <Getter name="pointerMoveHandlers" computed={this.getPointerMoveHandlers} />
        <Template name="series">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ series, rootRef }) => {
              if (!target) {
                return null;
              }
              const { text, element } = getParameters(series, target);
              return (
                <OverlayComponent
                  key={`${target.series}${target.point}`}
                  target={createReference(element, rootRef)}
                >
                  <ContentComponent text={text} targetItem={target} />
                </OverlayComponent>
              );
            }}
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
