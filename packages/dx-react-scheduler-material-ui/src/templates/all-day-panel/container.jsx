import { styled } from '@mui/material/styles';
import { ContainerBase } from '../common/container';

const PREFIX = 'Container';

export const classes = {
  container: `${PREFIX}-container`,
};

const StyledContainerBase = styled(ContainerBase)(() => ({
  [`& .${classes.container}`]: {
    position: 'relative',
    display: 'table',
    minWidth: '100%',
  },
}));

export const Container = (StyledContainerBase);
