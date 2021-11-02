import { styled } from '@mui/material/styles';
import { ContainerBase } from '../common/container';

const PREFIX = 'Container';

export const classes = {
  container: `${PREFIX}-container`,
};

const styledContainerBase = styled(ContainerBase)({
  [`&.${classes.container}`]: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
  },
});

export const Container = (styledContainerBase);
