import { styled } from '@mui/material/styles';
import { ContainerBase, classes } from '../common/container';

const StyledContainerBase = styled(ContainerBase)(() => ({
  [`& .${classes.container}`]: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    cursor: 'move',
  },
}));

export const Container = (StyledContainerBase);
