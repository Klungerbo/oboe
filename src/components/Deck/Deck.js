import React from 'react';
import {
  Card, Box, Button,
  CardActionArea,
  Paper,
} from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';


export default function Deck({ color, title, description }) {
  return (
    <Box style={{ height: "100%" }}>
      <Box display="flex">
        <Box flexGrow="1" />
        <Box pb={0.5}>
          <Button size="small" style={{ backgroundColor: `${color}` }} >
            Configure deck
          <Box pr={0.5} />
            <SettingsApplicationsIcon fontSize="default" />
          </Button>
        </Box>
      </Box>
      <Card raised style={{ backgroundColor: `${color}`, height: "240px" }} >
        <CardActionArea style={{ height: "100%" }}>
          <Box display="flex" style={{ height: "100%" }} flexDirection="column" >
            <Box px={1.5} pt={2} pb={1} >
              <Typography variant="h5">{title}</Typography>
            </Box>
            <Box px={1.5} flexGrow="1">
              <Typography variant="body2" color="textSecondary" component="p">
                {description}
              </Typography>
            </Box>
            <Box pb={1.5} style={{ width: "100%" }}>
              <Typography variant="h4" align="center">Review deck</Typography>
            </Box>
          </Box>
        </CardActionArea>
      </Card>
    </Box>
  );
}