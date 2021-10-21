// BLOCK:imports
import classNames from 'clsx';
import {
  Container, Row, Col, Label, FormGroup, Input, Button,
} from 'reactstrap';
// BLOCK:imports

// BLOCK:detailContent
function FieldGroup({ id, label, ...props }) {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Input {...props} />
    </FormGroup>
  );
}

const DetailContent = ({ row, ...rest }) => {
  const {
    processValueChange,
    applyChanges,
    cancelChanges,
  } = rest;
  return (
    <Container>
      <Row>
        <Col sm={4} className="px-2">
          <FieldGroup
            name="Prefix"
            label="Title"
            value={row.Prefix}
            onChange={processValueChange}
          />
        </Col>
        <Col sm={4} className="px-2">
          <FieldGroup
            name="FirstName"
            label="First Name"
            value={row.FirstName}
            onChange={processValueChange}
          />
        </Col>
        <Col sm={4} className="px-2">
          <FieldGroup
            name="LastName"
            label="Last Name"
            value={row.LastName}
            onChange={processValueChange}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={4} className="px-2">
          <FieldGroup
            name="Position"
            label="Position"
            value={row.Position}
            onChange={processValueChange}
          />
        </Col>
        <Col sm={4} className="px-2">
          <Label>State</Label>
          <select
            className="form-control"
            style={{ width: '100%' }}
            name="StateID"
            value={row.StateID}
            onChange={processValueChange}
          >
            {states.map(({ ID, Name }) => (
              <option key={ID} value={ID}>
                {Name}
              </option>
            ))}
          </select>
        </Col>
        <Col sm={4} className="px-2">
          <FieldGroup
            type="date"
            name="BirthDate"
            label="Birth Date"
            value={row.BirthDate}
            onChange={processValueChange}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <FieldGroup
            type="textarea"
            name="Notes"
            label="Notes"
            rows={4}
            value={row.Notes}
            onChange={processValueChange}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="float-right">
            <Button onClick={cancelChanges}>
              Cancel
            </Button>
            {' '}
            <Button onClick={applyChanges} color="primary">
              Save
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const ToggleCell = ({
  expanded, onToggle,
  tableColumn, tableRow, row, style,
  ...restProps
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    onToggle();
  };
  return (
    <td
      style={{
        cursor: 'pointer',
        verticalAlign: 'middle',
        textAlign: 'center',
        ...style,
      }}
      {...restProps}
    >
      <i
        role="button"
        tabIndex={0}
        aria-label={expanded ? 'Close' : 'Edit'}
        className={classNames({
          oi: true,
          'oi-x': expanded,
          'oi-pencil': !expanded,
        })}
        onClick={handleClick}
      />
    </td>
  );
};
// BLOCK:detailContent
