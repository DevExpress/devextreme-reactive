// BLOCK:body
const tooltipContentArgStyle = {
  paddingBottom: 0,
};
const tooltipContentValStyle = {
  paddingTop: 0,
};
const TooltipContentBase = ({
  title, arg, val, ...restProps
}) => (
  <div>
    <div>{title}</div>
    <div>
      <Tooltip.Content
        {...restProps}
        style={tooltipContentArgStyle}
        text={arg}
      />
    </div>
    <div>
      <Tooltip.Content
        {...restProps}
        style={tooltipContentValStyle}
        text={val}
      />
    </div>
  </div>
);

const ResetButton = props => (
  <button type="button" className="btn btn-outline-primary m-2" {...props}>Reset</button>
);
// BLOCK:body
