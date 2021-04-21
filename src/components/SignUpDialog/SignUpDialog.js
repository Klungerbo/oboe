import {
  Dialog, FormGroup, CardContent,
  Grid, TextField, Button
} from '@material-ui/core';
import React from 'react'
import { StyledDialogTitle } from "./SignupDialogStyled";

/**
 * Represents the sign up dialog that pops up when you click "Create new user" when not logged in
 * 
 * @param {Object} props: (open) Getter for the dialog open state
 *                        (onClose) Handler for closing the dialog i.e. set open state to false
 * @returns Sign up dialog as JSX
 */
export default function SignUpDialog({open, onClose}) {
  return (
    <Dialog open={open} maxWidth="xs" onClose={() => onClose(false)} aria-labelledby="dialog-title">
        <CardContent>
          <FormGroup>
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
                <TextField id="newemail" fullWidth variant="outlined" label="E-mail" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="newpassword" fullWidth variant="outlined" label="Password" type="password" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="confirmpassword" fullWidth variant="outlined" label="Confirm password" type="password" />
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" onClick={() => onClose(false)} color="secondary" fullWidth>Cancel</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="primary" fullWidth>Sign up</Button>
              </Grid>
            </Grid>
          </FormGroup>
        </CardContent>
      </Dialog>
  )
}
