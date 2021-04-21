import {
  Box,
} from '@material-ui/core'
import ReviewHelp from '../../components/ReviewHelp/ReviewHelp'
import ReviewCard from '../../components/ReviewCard/ReviewCard'
import { useParams } from 'react-router-dom';

export default function Review() {

  let { id } = useParams();

  return (
    <Box display="flex" justifyContent="space-between">
      <ReviewHelp></ReviewHelp>
      <ReviewCard deckid={id} />
      <div></div>
    </Box>
  )
}

