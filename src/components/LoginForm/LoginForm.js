import React from 'react';
import { useDispatch } from 'react-redux';
import {
  CardContent, Grid, Card,
  TextField, Button, Divider,
} from "@material-ui/core";

import { setLoggedIn, setUserEmail } from '../../store/actions/DataActions';
import { StyledSignUpButton } from "./LoginFormStyled";
import { API_AUTH_SIGNIN } from '../../data/config';

import validateEmail from '../../utils/emailValidator';

export default function LoginForm({ onOpen }) {
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = React.useState({});
  const [emailNotRegistered, setEmailNotRegistered] = React.useState(false);
  const [isEmail, setIsEmail] = React.useState(true);
  const [invalidPassword, setInvalidPassword] = React.useState(false);


  const handleLogin = e => {
    e.preventDefault();

    if (!validateEmail(userInfo.email)) {
      setIsEmail(false);
      return;
    } else {
      setIsEmail(true);
    }

    const userInfoJson = JSON.stringify(userInfo);
    fetch(API_AUTH_SIGNIN, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: userInfoJson
    }).then(response => {
      if (response.status === 200) {
        response.json().then(jsonObject => {
          const email = jsonObject.email;

          dispatch(setLoggedIn(true));
          dispatch(setUserEmail(email));
        });
      } else if (response.status === 401) {
        response.json().then(jsonObject => {
          const type = jsonObject["type"];
          if (type === "email") {
            setEmailNotRegistered(true);
            setInvalidPassword(false);
          } else if (type === "password") {
            setEmailNotRegistered(false);
            setInvalidPassword(true);
          }
        });
      }
    }).catch(error => console.log("Hello" + error));
  }

  return (
    <Card raised>
      <CardContent>
        <form onSubmit={handleLogin} >
          <Grid
            container
            direction="column"
            justify="flex-start"
            align="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <TextField
                onChange={e => setUserInfo({ ...userInfo, email: e.target.value })}
                required id="email" fullWidth variant="outlined" label="E-mail"
                helperText={(emailNotRegistered && "Email is not registered") || 
                !isEmail && "Provide a valid email"} 
                error={emailNotRegistered || !isEmail} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => setUserInfo({ ...userInfo, password: e.target.value })}
                required id="password" fullWidth variant="outlined" label="Password" type="password" 
                helperText={invalidPassword && "Password is incorrect"} error={invalidPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>Log in</Button>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" />
            </Grid>
            <Grid item xs={12}>
              <StyledSignUpButton variant="contained" onClick={() => onOpen(true)}>Create new user</StyledSignUpButton>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}
