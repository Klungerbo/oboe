import {
  Box,
} from '@material-ui/core'
import ReviewHelp from '../../components/ReviewHelp/ReviewHelp'
import ReviewCard from '../../components/ReviewCard/ReviewCard'
import { useEffect, useRef } from "react";

export default function Review() {

  return (
    <Box display="flex" justifyContent="space-between">
      <ReviewHelp></ReviewHelp>
      <ReviewCard id="flashcard" frontText="hello" backText="おはよう" description="Used as a greeting in japan" color="purple" />
      <div></div>
    </Box>
  )
}

