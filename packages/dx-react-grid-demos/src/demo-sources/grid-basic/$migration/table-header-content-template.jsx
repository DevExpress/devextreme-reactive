import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/material/styles";

const PREFIX = "Demo";
const classes = {
  button: `${PREFIX}-button`,
};
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  [`&.${classes.button}`]: {
    margin: theme.spacing(0, 1),
  },
}));

const CustomHeaderCell = ({ column }) => (
  <div>
    <span>{column.name}</span>
    <StyledIconButton
      className={classes.button}
      // eslint-disable-next-line no-alert
      onClick={() => alert("Custom action")}
      size="large"
    >
      <VisibilityOff />
    </StyledIconButton>
  </div>
);

export default () => {
  return (
    <div className="card">
      <DataGrid dataSource={rows}>
        {columns.map((column) => (
          <Column
            dataField={column.name}
            caption={column.title}
            allowSorting={column.name === "region" ? false : true}
            headerCellRender={
              column.name === "region" ? CustomHeaderCell : undefined
            }
          ></Column>
        ))}
      </DataGrid>
    </div>
  );
};