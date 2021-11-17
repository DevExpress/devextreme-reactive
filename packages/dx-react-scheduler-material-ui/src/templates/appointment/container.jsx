import { styled } from '@mui/material/styles';
import { ContainerBase, classes } from '../common/container';

export const Container = styled(ContainerBase)({
  [`&.${classes.container}`]: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
  },
});
