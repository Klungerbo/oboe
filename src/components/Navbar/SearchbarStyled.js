import { makeStyles, fade } from '@material-ui/core';
  
import styled from 'styled-components';

/**
 * Adapted from:
 * https://material-ui.com/components/app-bar/
 */
export const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
    [theme.breakpoints.down('xs')]: {
      width: '8ch',
      '&:focus': {
        width: '15ch',
      },
    }
  },
}));

/**
 * Adapted from:
 * https://material-ui.com/components/app-bar/
 */
export const StyledSearchIconContainer = styled.div`
    ${({ theme }) => `
        padding: ${theme.spacing(0, 2)};
        height: 100%;
        position: absolute;
        pointer-events: none;
        display: flex;
        align-items: center;
        justify-content: center;
    `}
`;

/**
 * Adapted from:
 * https://material-ui.com/components/app-bar/
 */
export const StyledSearchBar = styled.div`
    ${({ theme }) => `
        position: relative;
        border-radius: ${theme.shape.borderRadius};
        background-color: ${fade(theme.palette.common.white, 0.15)};
        &:hover {
            background-color: ${fade(theme.palette.common.white, 0.25)};
        }
        margin-left: 0;
        width: 100%;
        ${theme.breakpoints.up('sm')} {
            margin-left: ${theme.spacing(1)};
            width: auto;
        }
    `}
`;

