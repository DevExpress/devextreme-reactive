import React, { useState } from 'react';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  Legend,
  BarSeries,
  Title,
} from '@devexpress/dx-react-chart-bootstrap4';
import { Popper } from 'react-popper';
import domtoimage from 'dom-to-image';
import { Plugin, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';
import JsPDF from 'jspdf';
import { scaleBand } from '@devexpress/dx-chart-core';
import { ArgumentScale, Stack, Animation } from '@devexpress/dx-react-chart';

import { gaming as data } from '../../../demo-data/data-vizualization';

const rootContainerId = 'widget-container';
const iconButton = 'exportIconButton';
const ANIMATIONS = Symbol('animation');
const filter = node => (node.id !== iconButton);

const exportToImage = async (chart, format, exportFunc) => {
  try {
    const dataUrl = await exportFunc(chart, { filter });
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.download = `chart.${format}`;
    link.href = dataUrl;
    link.click();
    link.remove();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('oops, something went wrong!', err);
  }
};

const exportToJpeg = chart => exportToImage(chart, 'jpeg', domtoimage.toJpeg);

const exportToPng = chart => exportToImage(chart, 'png', domtoimage.toPng);

const exportToPdf = async (chart) => {
  const width = chart.offsetWidth;
  const height = chart.offsetHeight;
  try {
    const dataUrl = await domtoimage.toJpeg(chart, { filter });
    // @ts-ignore
    const doc = new JsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [width, height],
    });
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();
    doc.addImage(dataUrl, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    doc.save('chart');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('oops, something went wrong!', err);
  }
};

const print = async (chart) => {
  try {
    const dataUrl = await domtoimage.toJpeg(chart, { filter });
    let html = '<html><head><title></title></head>';
    html += '<body style="width: 100%; padding: 0; margin: 0;"';
    html += ' onload="window.focus(); window.print(); window.close()">';
    html += `<img src="${dataUrl}" /></body></html>`;

    const printWindow = window.open('', 'print');
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('oops, something went wrong!', err);
  }
};

const options = [
  { key: 'Print', action: print, text: 'Print' },
  { key: 'JPEG', action: exportToJpeg, text: 'Save as JPEG' },
  { key: 'PNG', action: exportToPng, text: 'Save as PNG' },
  { key: 'PDF', action: exportToPdf, text: 'Save as PDF' },
];

const buttonStyle = {
  width: '32px',
  height: '32px',
};

const addKeyframe = (name, def) => {
  if (typeof document === 'undefined') {
    return;
  }
  const head = document.getElementsByTagName('head')[0];
  let style = Array.from(head.getElementsByTagName('style'))
    .find(node => node.dataset[ANIMATIONS]);
  if (!style) {
    style = document.createElement('style');
    style.type = 'text/css';
    style.dataset[ANIMATIONS] = true;
    head.appendChild(style);
  }
  const content = style.textContent;
  if (!content.includes(name)) {
    style.textContent += `\n@keyframes ${name} ${def}\n`;
  }
};

const getLabelAnimationName = () => {
  const name = 'animation_label_opacity';
  addKeyframe(name, '{ 0% { opacity: 0; } 99% { opacity: 0; } 100% { opacity: 1; } }');
  return name;
};

const labelStyle = {
  fill: '#ffffff',
  animation: `${getLabelAnimationName()} 1s`,
  fontSize: '10px',
};

const Export = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
    } else {
      handleClose();
    }
  };

  const handleExport = ({ action }) => () => {
    const chart = document.querySelector(`#${rootContainerId}`);
    handleClose();
    action(chart);
  };

  const modifiers = [
    {
      name: 'offset',
      options: {
        offset: [0, 8],
      },
    },
  ];

  return (
    <Plugin name="Export">
      <Template name="top">
        <TemplatePlaceholder />
        <button
          type="button"
          id={iconButton}
          onClick={handleClick}
          className="btn btn-outline-secondary btn btn-primary btn-sm mt-0"
          style={buttonStyle}
        >
          <span className="oi oi-menu" />
        </button>
        { anchorEl
          ? (
            <Popper
              modifiers={modifiers}
              referenceElement={anchorEl}
            >
              {({
                ref, style, arrowProps,
              }) => (
                <div className={'popover show bs-popover-bottom'} ref={ref} style={style}>
                  {options.map((option, index) => (
                    <button
                      type="button"
                      key={index.toString()}
                      onClick={handleExport(option)}
                      className="dropdown-item"
                    >
                      {option.text}
                    </button>
                  ))}
                  <div className="arrow" ref={ref} {...arrowProps} />
                </div>
              )}
            </Popper>
          )
          : null}
      </Template>
    </Plugin>
  );
};

const BarWithLabel = ({
  value, ...restProps
}) => (
  <React.Fragment>
    <BarSeries.Point {...restProps} />
    <Chart.Label
      x={restProps.arg}
      y={(restProps.val + restProps.startVal) / 2}
      dominantBaseline="middle"
      textAnchor="middle"
      style={labelStyle}
    >
      {`${value}%`}
    </Chart.Label>
  </React.Fragment>
);

const legendRootStyle = {
  display: 'flex',
  margin: 'auto',
  flexDirection: 'row',
};
const LegendRoot = props => (
  <Legend.Root {...props} style={legendRootStyle} />
);

const legendItemStyle = {
  flexDirection: 'column',
  marginLeft: '-2px',
  marginRight: '-2px',
};
const LegendItem = props => (
  <Legend.Item {...props} style={legendItemStyle} />
);

const legendLabelStyle = {
  whiteSpace: 'nowrap',
};
const LegendLabel = props => (
  <Legend.Label {...props} style={legendLabelStyle} />
);
const Marker = (props) => {
  const { className, color } = props;
  return (
    <svg className={className} fill={color} width="16" height="16">
      <circle cx={8} cy={8} r={8} />
    </svg>
  );
};
const Text = (props) => {
  const { text } = props;
  const [mainText, subText] = text.split('\n');
  return (
    <div className="w-100 text-center mb-2">
      <h3>
        {mainText}
      </h3>
      <p>{subText}</p>
    </div>
  );
};

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <div className="card" id={rootContainerId}>
        <Chart
          data={chartData}
        >
          <Title
            text={'Estimated global gaming software\n(revenue by platform, in 2018)'}
            textComponent={Text}
          />
          <Legend
            position="bottom"
            rootComponent={LegendRoot}
            itemComponent={LegendItem}
            labelComponent={LegendLabel}
            markerComponent={Marker}
          />
          <ArgumentScale factory={scaleBand} />
          <ArgumentAxis />
          <ValueAxis showLabels={false} />

          <BarSeries
            name="Mobile Games"
            valueField="mobile"
            argumentField="year"
            pointComponent={BarWithLabel}
          />
          <BarSeries
            name="PC Games"
            valueField="pc"
            argumentField="year"
            pointComponent={BarWithLabel}
          />
          <BarSeries
            name="Console Games"
            valueField="console"
            argumentField="year"
            pointComponent={BarWithLabel}
          />
          <Stack />
          <Animation />
          <Export />
        </Chart>
      </div>
    );
  }
}
