import { Modal } from '@material-ui/core';
import styled from 'styled-components';

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledModalContent = styled.div`
  ${({ theme }) => `
    max-width: 30%;
    margin: auto;
    bottom: 5%; 
    position: absolute;
    width: ${theme.spacing(50)};
    background-color: ${theme.palette.background.paper};
    box-shadow: ${theme.shadows[10]};
    border: 1px solid #000;
    border-radius: 5px;
    padding: ${theme.spacing(2, 4, 3)};

    ${theme.breakpoints.down('xs')} {
      max-width: 90%;
    },
  `}
`;