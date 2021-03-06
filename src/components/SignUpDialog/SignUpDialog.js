import React from 'react'
import {
  Dialog, CardContent, Grid,
  TextField, Button, Typography,
  Box
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { StyledDialogTitle } from "./SignupDialogStyled";
import { setLoggedIn, setOpenVerifyCookies, setUserEmail } from '../../store/actions/DataActions';

import validateEmail from '../../utils/emailValidator';
import {
  API_AUTH_SIGNIN, API_AUTH_SIGNUP, API_AUTH_SIGNUP_VERIFY,
  oboeFetch
} from '../../utils/oboeFetch';
import { EMAIL, LOGGED_IN } from '../../data/localStorageVariables';

/**
 * Represents the sign up dialog that pops up when you click "Create new user" when not logged in
 * 
 * @param {Object} props: (open) Getter for the dialog open state
 *                        (onClose) Handler for closing the dialog i.e. set open state to false
 * @returns Sign up dialog as JSX
 */
export default function SignUpDialog({ open, onClose }) {
  const dispatch = useDispatch();
  const acceptedCookies = useSelector(state => state.acceptedCookies)

  const [passwordMatching, setPasswordMatching] = React.useState(true);
  const [emailTaken, setEmailTaken] = React.useState(false);
  const [isEmail, setIsEmail] = React.useState(true);
  const [verifyCodePhase, setVerifyCodePhase] = React.useState(false);
  const [incorrectVerifyCode, setIncorrectVerifyCode] = React.useState(false);
  const [newUserInfo, setNewUserInfo] = React.useState({
    email: "",
    password: "",
    confirmedPassword: ""
  });

  const handleSubmit = e => {
    e.preventDefault();

    if (!acceptedCookies) {
      dispatch(setOpenVerifyCookies(true))
      return;
    }

    if (!verifyCodePhase) {
      handleNewSignup(e);
    } else {
      handleVerifySignup(e);
    }
  }

  const handleClose = e => {
    setPasswordMatching(true);
    setEmailTaken(false);
    setIsEmail(true);
    setVerifyCodePhase(false);
    setIncorrectVerifyCode(false);
    setNewUserInfo({});
    onClose(false);
  }

  async function login() {
    try {
      const res = await oboeFetch(API_AUTH_SIGNIN, "POST", newUserInfo);

      if (res.status === 200) {
        const email = newUserInfo.email;

        dispatch(setLoggedIn(true));
        dispatch(setUserEmail(email));
        window.localStorage.setItem(LOGGED_IN, "TRUE");
        window.localStorage.setItem(EMAIL, email);
      }

      handleClose();
    } catch (error) { console.log(error) }
  }

  async function handleVerifySignup(e) {
    try {
      const response = await oboeFetch(API_AUTH_SIGNUP_VERIFY, "POST", newUserInfo);

      if (response.status === 400) {
        setEmailTaken(true);
      } else if (response.status === 401) {
        setIncorrectVerifyCode(true);
      } else if (response.status === 200) {
        setEmailTaken(false);
        setVerifyCodePhase(false);
        setIncorrectVerifyCode(false);

        login(newUserInfo);
      }
    } catch (error) { console.log(error) }
  }

  async function handleNewSignup(e) {
    if (!validateEmail(newUserInfo.email)) {
      setIsEmail(false);
      return;
    } else {
      setIsEmail(true);
    }

    setPasswordMatching(newUserInfo.password === newUserInfo.confirmedPassword);
    if (newUserInfo.password !== newUserInfo.confirmedPassword) {
      return;
    }

    try {
      const response = await oboeFetch(API_AUTH_SIGNUP, "POST", newUserInfo);

      if (response.status === 400) {
        setEmailTaken(true);
      } else if (response.status === 200) {
        setEmailTaken(false);
        setVerifyCodePhase(true);
      }
    } catch (error) { console.log(error) }
  }


  return (
    <Dialog open={open} maxWidth="xs" onClose={handleClose} aria-label="Create new user form">
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            justify="flex-start"
            align="center"
          >
            <Grid item xs={12}>
              <StyledDialogTitle variant="h3">Create New User</StyledDialogTitle>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => setNewUserInfo({ ...newUserInfo, email: e.target.value })}
                error={emailTaken || !isEmail}
                helperText={(emailTaken && "Email already in use") ||
                  (!isEmail && "Provide a valid email")}
                required
                disabled={verifyCodePhase}
                fullWidth
                autoFocus
                variant="outlined"
                label="E-mail" type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => setNewUserInfo({ ...newUserInfo, password: e.target.value })}
                required
                disabled={verifyCodePhase}
                fullWidth
                variant="outlined"
                label="Password"
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => setNewUserInfo({ ...newUserInfo, confirmedPassword: e.target.value })}
                required
                disabled={verifyCodePhase}
                fullWidth
                error={!passwordMatching}
                helperText={!passwordMatching ? "Passwords do not match" : ""}
                variant="outlined"
                label="Confirm password"
                type="password"
              />
              {
                verifyCodePhase &&
                <Grid item xs={12}>
                  <Box pt={2} pb={1}>
                    <Typography align="left">
                      A six digit verification code is being sent to your email.
                      To complete your registration, please insert that code into the box below.
                  </Typography>
                  </Box>
                  <TextField
                    onChange={e => setNewUserInfo({ ...newUserInfo, registrationCode: e.target.value })}
                    helperText={incorrectVerifyCode && `Code does not match the one sent to the email ${newUserInfo.email}`}
                    error={incorrectVerifyCode}
                    required
                    fullWidth
                    inputProps={{'aria-label': `A six digit verification code is being sent to your email.
                      To complete your registration, please insert that code into this box.`}}
                    variant="outlined"
                    label="Code"
                    id="verify-code"
                    autoFocus
                  />
                </Grid>
              }
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" onClick={handleClose} color="secondary" fullWidth>Cancel</Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                {verifyCodePhase ? "Confirm" : "Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Dialog>
  )
}
