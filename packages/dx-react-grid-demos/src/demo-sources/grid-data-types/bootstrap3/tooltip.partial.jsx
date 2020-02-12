// BLOCK:imports
// BLOCK:imports

// BLOCK:body
const TooltipFormatter = ({ row: { phone, birthDate }, value }) => (
  <span title={`phone: ${phone} \nbirth date: ${birthDate}`}>
    {value}
  </span>
);
// BLOCK:body
