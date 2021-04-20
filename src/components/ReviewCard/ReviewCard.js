import {
  Button, Grid, Box
} from '@material-ui/core';
import React from 'react'
import {
  StyledReviewCard, StyledFrontFace, StyledBackFace,
  StyledCenterText, StyledCenterBigText
} from "./ReviewCardStyled";
import useKeyPress from "react-use-keypress";
import { useHistory, useLocation } from 'react-router';

export default function ReviewCard({ frontText, backText, description, color }) {

  const cardRef = React.useRef();
  const [isFlipped, setIsFlipped] = React.useState(false);

  const history = useHistory();

  useKeyPress(["ArrowLeft", "ArrowRight", " "], () => {
    if (isFlipped) {
      return;
    }
    setIsFlipped(true);
    
  })
  
  useKeyPress(["ArrowUp"], () => {
    if (!isFlipped) {
      return;
    }
    // TODO: add logic
  })
  
  useKeyPress(["ArrowDown"], () => {
    if (!isFlipped) {
      return;
    }
    // TODO: add logic
  })
  useKeyPress(["Escape"], () => {
    history.push("/");
  })
  

  React.useEffect(() => {
    setupAnimation(cardRef.current);
  }, [])


  return (
    <StyledReviewCard ref={cardRef} onClick={() => console.log("clicked")}>
      <StyledFrontFace onLoad={() => console.log("loaded")} color={color}>
        <Box display="flex" flexDirection="column" height="100%">
          <Box flexGrow={1}>
            {frontText}
          </Box>
          <Button variant="contained" color="primary" fullWidth>Flip</Button>
        </Box>
      </StyledFrontFace>
      <StyledBackFace color={color}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StyledCenterBigText>
              {backText}
            </StyledCenterBigText>
          </Grid>
          <Grid item xs={12}>
            <StyledCenterText>{description}</StyledCenterText>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="secondary" fullWidth>Cancel</Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" fullWidth>Sign up</Button>
          </Grid>
        </Grid>

      </StyledBackFace>
    </StyledReviewCard>
  )
}

function setupAnimation(element) {
  console.log(element);
  const [frontside, backside] = element.children
  const animationFront = frontside.animate([{ translate: "rotateY(0.5turn)" }], 1000);
  const animationBack = backside.animate([{ translate: "rotateY(0.5turn)" }], 1000);
  console.log(animationBack);
  animationFront.pause();
  animationBack.pause();

  document.addEventListener("keydown", ({ key }) => {
    if (["ArrowLeft", "ArrowRight", " "].includes(key)) {
      animationFront.play();
      animationBack.play();
      console.log("Flipped");
    }
  })
}