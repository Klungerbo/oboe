import { Dialog, FormGroup, Card, CardContent, Grid, TextField, Button } from '@material-ui/core';
import React from 'react'

export default function SignUpDialog({open, onClose}) {
  return (
    <Dialog open={open} maxWidth="xs" onClose={() => onClose(false)}>
        <CardContent>
          <FormGroup>
            <Grid
              container
              spacing={2}
              direction="col"
              justify="flex-start"
              align="center"
            >
              <Grid item xs={12}>
                <TextField id="newemail" fullWidth={true} variant="outlined" label="E-mail" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="newpassword" fullWidth={true} variant="outlined" label="Password" type="password" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="confirmpassword" fullWidth={true} variant="outlined" label="Confirm password" type="password" />
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" onClick={() => onClose(false)} color="secondary" fullWidth={true}>Cancel</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="primary" fullWidth={true}>Sign up</Button>
              </Grid>
            </Grid>
          </FormGroup>
        </CardContent>
      </Dialog>
  )
}
