import { styled } from '@mui/material/styles';
import { ContainerBase, classes } from '../common/container';


const StyledContainerBase = styled(ContainerBase)(() => ({
  [`& .${classes.container}`]: {
    position: 'relative',
    display: 'table',
    minWidth: '100%',
  },
}));

export const Container = (StyledContainerBase);
