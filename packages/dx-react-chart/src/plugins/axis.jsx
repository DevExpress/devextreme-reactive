import * as React from 'react';
import * as PropTypes from 'prop-types';

import {
  Plugin,
  TemplateConnector,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

export const Axis = props => (
  <Plugin name="Axis">
    <Template name="axis">
      <TemplatePlaceholder />
      <g>
        <TemplateConnector>
          {({ path }) =>
            path[props.dataField].map(item => (
              <React.Fragment key={item.text} >
                <line
                  style={{ stroke: 'black', strokeWidth: '1px' }}
                  x1={item.x1}
                  x2={item.x2}
                  y1={item.y1}
                  y2={item.y2}
                />
                {/* <text
                  alignmentBaseline="middle"
                  textAnchor="middle"
                  key={item.text}
                  x={item.x}
                  y={item.y}
                >
                  {item.text}
                </text> */}
              </React.Fragment>
            ))
          }
        </TemplateConnector>
      </g>
    </Template>
  </Plugin>
);

Axis.propTypes = {
  dataField: PropTypes.string.isRequired,
};
