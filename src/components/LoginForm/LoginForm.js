import React from 'react'
import {
  CardContent, FormGroup, Grid,
  TextField, Button, Divider, useTheme
} from "@material-ui/core";
import { StyledLoginForm, StyledSignUpButton } from "./LoginFormStyled";

export default function LoginForm({ onOpen }) {

  const theme = useTheme();
  console.log(theme);

  return (
    <StyledLoginForm raised>
      <CardContent>
        <FormGroup>
          <Grid
            container
            direction="column"
            justify="flex-start"
            align="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <TextField id="email" fullWidth variant="outlined" label="E-mail" />
            </Grid>
            <Grid item xs={12}>
              <TextField id="password" fullWidth variant="outlined" label="Password" type="password" />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth>Log in</Button>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" />
            </Grid>
            <Grid item xs={12}>
              <StyledSignUpButton variant="contained" onClick={() => onOpen(true)}>Create new user</StyledSignUpButton>
            </Grid>
          </Grid>
        </FormGroup>
      </CardContent>
    </StyledLoginForm>
  )
}
