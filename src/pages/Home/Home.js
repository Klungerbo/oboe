import { Container, Box, Typography } from '@material-ui/core'
import React from 'react'
import SignUpDialog from '../../components/SignUpDialog/SignUpDialog';
import LoginForm from '../../components/LoginForm/LoginForm';
import "./Home.css";

/**
 * The home page of Oboe. When logged in, it will display all the user's decks. When logged out,
 * it will show a login prompt.
 * 
 * @returns JSX of guest/user home page
 */
export default function Home() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Container>
        <Box className="homepage">
          <Box flexGrow="1">
            <Typography variant="h1">Oboe</Typography>
            <Typography variant="h2">Decks and cards</Typography>
            <Typography variant="body1">With Oboe, you can create, manage, and review decks of flashcards.
              Each card has a front and backside, where the front is the question to which the back holds the answer.
            </Typography>
            <Typography variant="h2">Spaced repetition system</Typography>
            <Typography variant="body1">Oboe automatically balances the frequency of a card’s presence in a review. 
              Cards that have been forgotten will show up more frequently than those that were remembered.
            </Typography>
          </Box>
          <Box flexBasis={300} flexShrink={0}>
            <LoginForm onOpen={setIsOpen}/>
          </Box>
        </Box>
      </Container>
      <SignUpDialog open={isOpen} onClose={setIsOpen} />
    </>
  )
}