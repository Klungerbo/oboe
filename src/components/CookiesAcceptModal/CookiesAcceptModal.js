import React, { useEffect } from 'react';
import {
  Box, Button, Slide,
  Typography
} from '@material-ui/core';
import { StyledModalContent, StyledModal } from './StyledCookiesAcceptModal';


export default function CookiesAcceptModal() {
  const MADE_COOKIE_DECISION = "madeCookieDecision";
  const ACCEPTED_COOKIES = "acceptedCookies";

  const localStorage = window.localStorage;
  const madeCookieDecision = localStorage.getItem(MADE_COOKIE_DECISION);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    localStorage.setItem(ACCEPTED_COOKIES, "RUE");
    localStorage.setItem(MADE_COOKIE_DECISION, "RUE")

    handleClose();
  }

  const modalContent = (
    <Slide direction="up" in={open}>
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

  useEffect(() => {
    setTimeout(() => {
      if (madeCookieDecision !== "TRUE") {
        setOpen(true);
      }
    }, 500);
  }, [madeCookieDecision])

  return (
    <>
      <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby="cookies-notify-modal-title"
        aria-describedby="cookies-notify-modal"
      >
        {modalContent}
      </StyledModal>
    </>
  )
}
