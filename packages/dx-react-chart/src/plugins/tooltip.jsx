import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  Getter,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { getParameters, processPointerMove } from '@devexpress/dx-chart-core';
import { Target } from '../templates/tooltip/target';
import { withComponents } from '../utils';

class RawTooltip extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      target: props.targetItem || props.defaultTargetItem,
    };
    const handlePointerMove = this.handlePointerMove.bind(this);
    this.getPointerMoveHandlers = ({ pointerMoveHandlers }) => [
      ...pointerMoveHandlers, handlePointerMove,
    ];
  }

  handlePointerMove({ targets }) {
    const { onTargetItemChange } = this.props;
    const { target: currentTarget } = this.state;
    const target = processPointerMove(targets, currentTarget, onTargetItemChange);
    if (target !== undefined) {
      if (target && target.point === undefined) {
        this.setState({
          target: null,
        });
      }
      this.setState({
        target,
      });
    }
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
                    target={this.targetElement}
                    visible={!!(target && target.point !== undefined)}
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
    point: PropTypes.number,
  }),
  targetItem: PropTypes.shape({
    series: PropTypes.string.isRequired,
    point: PropTypes.number,
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
