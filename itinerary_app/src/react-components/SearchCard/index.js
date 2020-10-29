import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Button, IconButton, Typography, Grid} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles({
  root: {
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardQuote: {
    height: '200px',
  },
});

const SearchCard = props => {
    const classes = useStyles();
    const {firstName, lastName, profilePic, location, quote, banner} = props;
    return (<Grid xs={12} sm={3}>
            <Box m={3}>
              <Card variant="outlined">
                  <CardHeader
                      avatar={
                      <Avatar src={profilePic} />
                      }
                      action={
                      <IconButton aria-label="settings">
                          <MoreVertIcon />
                      </IconButton>
                      }
                      title={firstName + " " + lastName}
                      subheader={location}
                />
                <CardMedia
                  style={{height: "150px"}}
                  className={classes.media}
                  image={banner}
                  title=""
                />
                <CardContent>
                  <Typography variant="body2" component="p">
                    {quote}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">View Profile</Button>
                  <Button size="small">Add As Friend</Button>
                  <Button size="small">Block</Button>
                </CardActions>
              </Card>
              </Box>
            </Grid>
    );
};

export default SearchCard;