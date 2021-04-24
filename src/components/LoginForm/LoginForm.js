import React from 'react';
import { useDispatch } from 'react-redux';
import {
  CardContent, Grid, Card,
  TextField, Button, Divider,
} from "@material-ui/core";
import { StyledSignUpButton } from "./LoginFormStyled";
import { setLoggedIn, setUser } from '../../store/actions/DataActions';

export default function LoginForm({ onOpen, email, password }) {
  const [userInfo, setUserInfo] = React.useState({
    email: email ?? null,
    password: password ?? null
  })

  const dispatch = useDispatch();  

  const handleLogin = e => {
    e.preventDefault();

    const userInfoJson = JSON.stringify(userInfo);
    console.log("Sending: " + userInfoJson);
    fetch(`https://oboe.klungerbo.com/api/auth/signin/`, {
      method: "post",
      headers: { "content-type": "application/json" },
      body: userInfoJson
    }).then(response => {
      if (response.status === 200) {
        response.json().then(jsonObject => {
          const token = jsonObject.accessToken;
          const email = jsonObject.email;
          
          dispatch(setLoggedIn(true));
          dispatch(setUser({jwtToken: token, email: email}));
        });
      }
    });
  }

  React.useEffect(() => {
    setUserInfo({ email: email, password: password })
    console.log("Hello");
  }, [email, password]);

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
                required id="email" fullWidth variant="outlined" label="E-mail" value={userInfo.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => setUserInfo({ ...userInfo, password: e.target.value })}
                required id="password" fullWidth variant="outlined" label="Password" type="password" value={userInfo.password}
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
