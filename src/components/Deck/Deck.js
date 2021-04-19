import React from 'react';
import {
  Card, Box, Button,
  CardActionArea,
} from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';


export default function Deck({ color, title, description }) {
  return (
    <Box style={{height: "100%"}}>
      <Box display="flex" pb={0.5}>
        <Box flexGrow="1" />
        <Button size="small" style={{ backgroundColor: `${color}` }} >
          Configure deck
          <Box pr={0.5} />
          <SettingsApplicationsIcon fontSize="default" />
        </Button>
      </Box>
      <Card raised style={{ backgroundColor: `${color}`, height: "270px" }} >
        <CardActionArea style={{height: "100%"}}> 
          <CardHeader title={title} />
          <CardContent>
            <Typography variant="body2" color="textPrimary" component="p">
              {description}
            </Typography>
            <Box pt={3} />
            <Typography variant="h4" align="center">Review deck</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
</Box>
  );
}