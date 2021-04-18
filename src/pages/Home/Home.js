import { Container, Box, Grid, Typography, TextField, FormGroup, Card, CardContent, Button } from '@material-ui/core'
import React from 'react'
import SignUpDialog from '../../components/SignUpDialog/SignUpDialog';

export default function Home() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Container>
        <Box display="flex" gridGap={20}>
          <Box flexGrow="1">
            <Typography variant="h1">Oboe</Typography>
            <Typography variant="h2">Decks and cards</Typography>
            <Typography variant="body1">With Oboe, you can create, manage, and review decks of flashcards. Each card has a front and backside, where the front is the question to which the back holds the answer. </Typography>
            <Typography variant="h2">Spaced repetition system</Typography>
            <Typography variant="body1">Oboe automatically balances the frequency of a card’s presence in a review. Cards that have been forgotten will show up more frequently than those that were remembered. </Typography>
          </Box>
          <Box flexBasis={300} flexShrink={0}>
            <Card raised={true}>
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
                      <TextField id="email" fullWidth={true} variant="outlined" label="E-mail" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField id="password" fullWidth={true} variant="outlined" label="Password" type="password" />
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" color="primary" fullWidth={true}>Log in</Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider variant="middle" />
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" style={{ backgroundColor: "dodgerblue", color: "white" }} onClick={() => setIsOpen(true)} fullWidth={true}>Create new user</Button>
                    </Grid>
                  </Grid>
                </FormGroup>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
      <SignUpDialog open={isOpen} onClose={setIsOpen} />
    </>
  )
}