import { styled } from '@mui/material/styles';
import { ContainerBase } from '../common/container';

const PREFIX = 'Container';

const classes = {
  container: `${PREFIX}-container`,
};

const Root = styled(ContainerBase)(() => ({
  [`& .${classes.container}`]: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    cursor: 'move',
  },
}));

export const Container = (Root);
