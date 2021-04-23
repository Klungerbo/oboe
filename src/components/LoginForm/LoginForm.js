import React from 'react'
import {
  CardContent, FormGroup, Grid,
  TextField, Button, Divider,
  Card
} from "@material-ui/core";
import { StyledSignUpButton } from "./LoginFormStyled";

export default function LoginForm({ onOpen, email, password }) {

  return (
    <Card raised>
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
              <TextField id="email" value={email} fullWidth variant="outlined" label="E-mail" />
            </Grid>
            <Grid item xs={12}>
              <TextField id="password" value={password} fullWidth variant="outlined" label="Password" type="password" />
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
    </Card>
  )
}
