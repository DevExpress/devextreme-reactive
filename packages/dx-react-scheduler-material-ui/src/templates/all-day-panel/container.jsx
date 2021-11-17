import { styled } from '@mui/material/styles';
import { ContainerBase, classes } from '../common/container';

export const Container = styled(ContainerBase)(() => ({
  [`&.${classes.container}`]: {
    position: 'relative',
    display: 'table',
    minWidth: '100%',
  },
}));
