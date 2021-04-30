import React from 'react'
import {
  Dialog, CardContent, Grid, 
  TextField, Button
} from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { StyledDialogTitle } from "./SignupDialogStyled";
import { API_AUTH_SIGNUP, API_AUTH_SIGNIN } from '../../data/config';
import { setLoggedIn, setUserEmail } from '../../store/actions/DataActions';

import validateEmail from '../../utils/emailValidator';

/**
 * Represents the sign up dialog that pops up when you click "Create new user" when not logged in
 * 
 * @param {Object} props: (open) Getter for the dialog open state
 *                        (onClose) Handler for closing the dialog i.e. set open state to false
 * @returns Sign up dialog as JSX
 */
export default function SignUpDialog({ open, onClose }) {
  const dispatch = useDispatch();

  const [passwordMatching, setPasswordMatching] = React.useState(true);
  const [emailTaken, setEmailTaken] = React.useState(false);
  const [isEmail, setIsEmail] = React.useState(true);

  // TODO REMOVE ROLES FROM CLIENT SIDE
  const [newUserInfo, setNewUserInfo] = React.useState({
    email: "",
    password: "",
    confirmedPassword: "",
    roles: ["user"]
  });

  const handleSubmit = e => {
    e.preventDefault();

    if (!validateEmail(newUserInfo.email)) {
      setIsEmail(false);
      return;
    } else {
      setIsEmail(true);
    }

    setPasswordMatching(newUserInfo.password === newUserInfo.confirmedPassword);
    if (newUserInfo.password !== newUserInfo.confirmedPassword)
      return;

    const newUserInfoJson = JSON.stringify({
      email: newUserInfo.email,
      password: newUserInfo.password
    });

    fetch(API_AUTH_SIGNUP, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: newUserInfoJson
    }).then(response => {
      if (response.status === 400) {
        setEmailTaken(true);
      } else if (response.status === 200) {
        setEmailTaken(false);

        dispatch(setUserEmail(newUserInfo.email));

        fetch(API_AUTH_SIGNIN, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: newUserInfoJson
        }).then(response => {
          if (response.status === 200) {
            response.json().then(jsonObject => {
              dispatch(setLoggedIn(true));
            });
          }
        });

        onClose(false);
      }
    });
  }

  return (
    <Dialog open={open} maxWidth="xs" onClose={() => onClose(false)} aria-labelledby="dialog-title">
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            justify="flex-start"
            align="center"
          >
            <Grid item xs={12}>
              <StyledDialogTitle id="dialog-title" variant="h3">Create New User</StyledDialogTitle>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => setNewUserInfo({ ...newUserInfo, email: e.target.value })}
                error={emailTaken || !isEmail}
                helperText={(emailTaken && "Email already in use") || 
                (!isEmail && "Provide a valid email")}
                required
                fullWidth
                variant="outlined"
                label="E-mail"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => setNewUserInfo({ ...newUserInfo, password: e.target.value })}
                required
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
                fullWidth
                error={!passwordMatching}
                helperText={!passwordMatching ? "Passwords do not match" : ""}
                variant="outlined"
                label="Confirm password"
                type="password"
              />
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" onClick={() => onClose(false)} color="secondary" fullWidth>Cancel</Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Sign up
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Dialog>
  )
}
