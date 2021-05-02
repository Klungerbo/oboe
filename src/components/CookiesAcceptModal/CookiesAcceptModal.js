import React from 'react';
import {
  Box, Button, Slide,
  Typography
} from '@material-ui/core';
import { StyledModalContent, StyledModal } from './StyledCookiesAcceptModal';
import { ACCEPTED_COOKIES } from '../../data/localStorageVariables';
import { useDispatch, useSelector } from 'react-redux';
import { setAcceptedCookies, setOpenVerifyCookies } from '../../store/actions/DataActions';


export default function CookiesAcceptModal() {
  const localStorage = window.localStorage;

  const dispatch = useDispatch();
  const openVerifyCookies = useSelector(state => state.openVerifyCookies)

  const handleClose = () => {
    dispatch(setOpenVerifyCookies(false));
  };

  const handleAccept = () => {
    localStorage.setItem(ACCEPTED_COOKIES, "TRUE");
    dispatch(setAcceptedCookies(true));

    handleClose();
  }

  const modalContent = (
    <Slide direction="up" in={openVerifyCookies}>
      <StyledModalContent>
        <Typography
          variant="h1"
          style={{ fontSize: "1.5rem" }}
          gutterBottom
          id="cookies-notify-modal-title"
        >
          This website uses cookies
        </Typography>
        <Typography paragraph id="cookies-notify-modal">
          We only use cookies to store and manage account sessions. These
          cookies are essential for Oboe to work as they are used to identify
          your account and your login status. At this point in time, Oboe does
          not share any cookies with third parties and does not intend to in
          the foreseeable future.
      </Typography>
        <Typography paragraph>
          You will get a new notification if there are any changes in our cookie policy.
      </Typography>
        <Box display="flex">
          <Box flexGrow="1" />
          <Button color="primary" variant="contained" onClick={handleAccept}>Accept</Button>
        </Box>
      </StyledModalContent>
    </Slide>
  );

  return (
    <>
      <StyledModal
        open={openVerifyCookies}
        onClose={handleClose}
        aria-labelledby="cookies-notify-modal-title"
        aria-describedby="cookies-notify-modal"
      >
        {modalContent}
      </StyledModal>
    </>
  )
}
